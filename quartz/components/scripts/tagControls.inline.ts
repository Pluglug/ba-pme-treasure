// Tag Page Controls - Sorting and Filtering
// This script provides client-side sorting and filtering for tag page listings

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

  const items = listContainer.querySelectorAll("li.section-li")
  if (items.length === 0) return

  // Extract data from each item
  const postsData: PostData[] = []
  const allTypes = new Set<string>()

  items.forEach((item) => {
    const element = item as HTMLElement

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
  if (postsData.length < 5) return

  // Create controls container
  const controlsContainer = document.createElement("div")
  controlsContainer.className = "tag-controls"

  // === Sort Controls ===
  const sortContainer = document.createElement("div")
  sortContainer.className = "tag-controls-sort"

  const sortLabel = document.createElement("span")
  sortLabel.textContent = "Sort by: "
  sortLabel.className = "controls-label"

  const sortSelect = document.createElement("select")
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

  const filterButtons = document.createElement("div")
  filterButtons.className = "filter-buttons"

  // Add "All" button
  const allBtn = document.createElement("button")
  allBtn.className = "filter-btn active"
  allBtn.dataset.type = "all"
  allBtn.textContent = `All (${postsData.length})`
  filterButtons.appendChild(allBtn)

  // Add type filter buttons
  const typeCounts = new Map<string, number>()
  postsData.forEach((p) => {
    typeCounts.set(p.type, (typeCounts.get(p.type) || 0) + 1)
  })

  // Sort types by count descending
  const sortedTypes = [...allTypes].sort((a, b) => (typeCounts.get(b) || 0) - (typeCounts.get(a) || 0))

  sortedTypes.forEach((type) => {
    const count = typeCounts.get(type) || 0
    const btn = document.createElement("button")
    btn.className = `filter-btn filter-btn-${type}`
    btn.dataset.type = type
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

  // === Event Handlers ===
  let currentFilter = "all"
  let currentSort = "date-desc"

  function applyFiltersAndSort() {
    // Filter
    let filtered = postsData
    if (currentFilter !== "all") {
      filtered = postsData.filter((p) => p.type === currentFilter)
    }

    // Sort
    filtered.sort((a, b) => {
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

    // Update visibility and order
    postsData.forEach((p) => {
      p.element.style.display = "none"
    })

    filtered.forEach((p) => {
      p.element.style.display = ""
      listContainer.appendChild(p.element) // Re-append to reorder
    })

    // Update visible count
    const visibleCount = filtered.length
    const totalCount = postsData.length
    if (itemCountP) {
      if (currentFilter === "all") {
        itemCountP.textContent = `${totalCount} items with this tag.`
      } else {
        itemCountP.textContent = `Showing ${visibleCount} of ${totalCount} items (filtered by: ${currentFilter})`
      }
    }
  }

  // Sort change handler
  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value
    applyFiltersAndSort()
  })

  // Filter button handlers
  filterButtons.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterButtons.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      currentFilter = (btn as HTMLElement).dataset.type || "all"
      applyFiltersAndSort()
    })
  })
}

// Initialize on navigation (SPA mode)
document.addEventListener("nav", () => {
  // Only run on tag pages
  if (window.location.pathname.startsWith("/tags/")) {
    initTagControls()
  }
})
