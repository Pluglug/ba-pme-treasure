// Tag Page Controls - Sorting, Filtering, and Pagination
// This script provides client-side controls for tag page listings
// with pagination to prevent browser freeze on large lists (1000+ items)

const ITEMS_PER_PAGE = 50 // Show 50 items at a time

interface PostData {
  element: HTMLElement
  date: number
  type: string
  author: string
  tags: string[]
}

function initTagControls() {
  const pageListingContainer = document.querySelector(".page-listing")
  if (!pageListingContainer) return

  const listContainer = pageListingContainer.querySelector("ul.section-ul")
  if (!listContainer) return
  const postList = listContainer
  postList.id ||= "tag-results-list"

  const items = listContainer.querySelectorAll("li.section-li")
  if (items.length === 0) return

  // CRITICAL: Immediately hide all items to prevent layout thrashing
  // This must happen before any other processing
  const itemsArray = Array.from(items) as HTMLElement[]
  itemsArray.forEach((item) => {
    item.hidden = true
  })

  // Extract data from each item
  const postsData: PostData[] = []
  const allTypes = new Set<string>()

  itemsArray.forEach((element) => {
    // Extract date from meta
    const metaEl = element.querySelector(".meta")
    const dateText = metaEl?.textContent?.trim() || ""
    const date = new Date(dateText).getTime() || 0

    // Extract type from badge
    const typeEl = element.querySelector(".post-type")
    const type = typeEl?.textContent?.trim().toLowerCase() || "unknown"
    if (type !== "unknown") allTypes.add(type)

    // Extract author
    const authorEl = element.querySelector(".post-author")
    const authorText = authorEl?.textContent?.trim() || ""
    const author = authorText.replace(/^by\s+/i, "").toLowerCase()

    // Extract tags from tag links
    const tagEls = element.querySelectorAll(".tags .tag-link")
    const tags: string[] = []
    tagEls.forEach((tagEl) => {
      tags.push(tagEl.textContent?.trim() || "")
    })

    postsData.push({ element, date, type, author, tags })
  })

  // Don't add controls if there are very few items
  if (postsData.length < 5) {
    // Show all items if less than 5
    postsData.forEach((p) => (p.element.hidden = false))
    return
  }

  // Create controls container
  const controlsContainer = document.createElement("div")
  controlsContainer.className = "tag-controls"

  // === Sort Controls ===
  const sortContainer = document.createElement("div")
  sortContainer.className = "tag-controls-sort"

  const sortLabel = document.createElement("label")
  sortLabel.textContent = "Sort by: "
  sortLabel.className = "controls-label"

  const sortSelect = document.createElement("select")
  sortSelect.id = "tag-results-sort"
  sortLabel.htmlFor = sortSelect.id
  sortSelect.className = "sort-select"
  sortSelect.innerHTML = `
    <option value="date-desc">Date (Newest)</option>
    <option value="date-asc">Date (Oldest)</option>
    <option value="type">Type</option>
    <option value="author">Author</option>
  `

  sortContainer.appendChild(sortLabel)
  sortContainer.appendChild(sortSelect)

  // === Filter Controls ===
  const filterContainer = document.createElement("div")
  filterContainer.className = "tag-controls-filter"

  const filterLabel = document.createElement("span")
  filterLabel.textContent = "Filter: "
  filterLabel.className = "controls-label"
  filterLabel.id = "tag-results-filter-label"

  const filterButtons = document.createElement("div")
  filterButtons.className = "filter-buttons"
  filterButtons.setAttribute("role", "group")
  filterButtons.setAttribute("aria-labelledby", filterLabel.id)

  // Add "All" button
  const allBtn = document.createElement("button")
  allBtn.type = "button"
  allBtn.className = "filter-btn active"
  allBtn.dataset.type = "all"
  allBtn.setAttribute("aria-pressed", "true")
  allBtn.textContent = `All (${postsData.length})`
  filterButtons.appendChild(allBtn)

  // Add type filter buttons
  const typeCounts = new Map<string, number>()
  postsData.forEach((p) => {
    typeCounts.set(p.type, (typeCounts.get(p.type) || 0) + 1)
  })

  // Sort types by count descending
  const sortedTypes = [...allTypes].sort(
    (a, b) => (typeCounts.get(b) || 0) - (typeCounts.get(a) || 0),
  )

  sortedTypes.forEach((type) => {
    const count = typeCounts.get(type) || 0
    const btn = document.createElement("button")
    btn.type = "button"
    btn.className = `filter-btn filter-btn-${type}`
    btn.dataset.type = type
    btn.setAttribute("aria-pressed", "false")
    btn.textContent = `${type} (${count})`
    filterButtons.appendChild(btn)
  })

  filterContainer.appendChild(filterLabel)
  filterContainer.appendChild(filterButtons)

  // Assemble controls
  controlsContainer.appendChild(sortContainer)
  controlsContainer.appendChild(filterContainer)

  // Insert controls before the list
  const itemCountP = pageListingContainer.querySelector("p")
  if (itemCountP) {
    itemCountP.after(controlsContainer)
  } else {
    pageListingContainer.prepend(controlsContainer)
  }

  // === Pagination Controls ===
  const paginationContainer = document.createElement("div")
  paginationContainer.className = "tag-pagination"

  const loadMoreBtn = document.createElement("button")
  loadMoreBtn.type = "button"
  loadMoreBtn.className = "load-more-btn"
  loadMoreBtn.textContent = "Load More"
  loadMoreBtn.setAttribute("aria-controls", postList.id)

  const paginationInfo = document.createElement("span")
  paginationInfo.className = "pagination-info"
  paginationInfo.setAttribute("aria-live", "polite")

  paginationContainer.appendChild(paginationInfo)
  paginationContainer.appendChild(loadMoreBtn)

  // === Event Handlers ===
  let currentFilter = "all"
  let currentSort = "date-desc"
  let currentPage = 1
  let filteredData: PostData[] = []

  function applyFiltersAndSort(resetPage = true) {
    if (resetPage) {
      currentPage = 1
    }

    // Filter
    filteredData = postsData
    if (currentFilter !== "all") {
      filteredData = postsData.filter((p) => p.type === currentFilter)
    }

    // Sort
    filteredData.sort((a, b) => {
      switch (currentSort) {
        case "date-desc":
          return b.date - a.date
        case "date-asc":
          return a.date - b.date
        case "type":
          return a.type.localeCompare(b.type)
        case "author":
          return a.author.localeCompare(b.author)
        default:
          return 0
      }
    })

    // Hide all items first
    postsData.forEach((p) => {
      p.element.hidden = true
    })

    // Show only items up to current page
    const visibleCount = Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)
    for (let i = 0; i < visibleCount; i++) {
      filteredData[i].element.hidden = false
      postList.appendChild(filteredData[i].element) // Re-append to maintain order
    }

    // Update pagination info
    const totalFiltered = filteredData.length
    paginationInfo.textContent = `Showing ${visibleCount} of ${totalFiltered} items`

    // Show/hide load more button
    if (visibleCount >= totalFiltered) {
      loadMoreBtn.style.display = "none"
    } else {
      loadMoreBtn.style.display = ""
      loadMoreBtn.textContent = `Load More (${totalFiltered - visibleCount} remaining)`
    }

    // Update count text
    if (itemCountP) {
      if (currentFilter === "all") {
        itemCountP.textContent = `${postsData.length} items with this tag.`
      } else {
        itemCountP.textContent = `Filtered: ${totalFiltered} of ${postsData.length} items (${currentFilter})`
      }
    }
  }

  // Load more button handler
  loadMoreBtn.addEventListener("click", () => {
    currentPage++
    applyFiltersAndSort(false)
  })

  // Sort change handler
  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value
    applyFiltersAndSort()
  })

  // Filter button handlers
  filterButtons.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterButtons.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.remove("active")
        b.setAttribute("aria-pressed", "false")
      })
      btn.classList.add("active")
      btn.setAttribute("aria-pressed", "true")

      currentFilter = (btn as HTMLElement).dataset.type || "all"
      applyFiltersAndSort()
    })
  })

  // Insert pagination container after the list
  listContainer.after(paginationContainer)

  // Initial display - show first page
  applyFiltersAndSort()
}

// Initialize on navigation (SPA mode)
document.addEventListener("nav", () => {
  // Only run on tag pages (handle both root and subdirectory deployments)
  if (window.location.pathname.includes("/tags/")) {
    initTagControls()
  }
})
