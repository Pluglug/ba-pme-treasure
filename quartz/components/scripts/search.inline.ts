import FlexSearch, { DefaultDocumentSearchResults } from "flexsearch"
import { ContentDetails } from "../../plugins/emitters/contentIndex"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, normalizeRelativeURLs, resolveRelative } from "../../util/path"

interface Item {
  id: number
  slug: FullSlug
  title: string
  content: string
  summary: string
  tags: string[]
  verificationStatus?: string
  searchScope: SearchScope
  [key: string]: any
}

// Can be expanded with things like "term" in the future
type SearchType = "basic" | "tags"
type SearchScope = "answers" | "archive"
let currentSearchTerm: string = ""
const encoder = (str: string): string[] => {
  const tokens: string[] = []
  let bufferStart = -1
  let bufferEnd = -1
  const lower = str.toLowerCase()

  let i = 0
  for (const char of lower) {
    const code = char.codePointAt(0)!

    const isCJK =
      (code >= 0x3040 && code <= 0x309f) ||
      (code >= 0x30a0 && code <= 0x30ff) ||
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0xac00 && code <= 0xd7af) ||
      (code >= 0x20000 && code <= 0x2a6df)

    const isWhitespace = code === 32 || code === 9 || code === 10 || code === 13

    if (isCJK) {
      if (bufferStart !== -1) {
        tokens.push(lower.slice(bufferStart, bufferEnd))
        bufferStart = -1
      }
      tokens.push(char)
    } else if (isWhitespace) {
      if (bufferStart !== -1) {
        tokens.push(lower.slice(bufferStart, bufferEnd))
        bufferStart = -1
      }
    } else {
      if (bufferStart === -1) bufferStart = i
      bufferEnd = i + char.length
    }

    i += char.length
  }

  if (bufferStart !== -1) {
    tokens.push(lower.slice(bufferStart))
  }

  return tokens
}

const createSearchIndex = () =>
  new FlexSearch.Document<Item>({
    encode: encoder,
    document: {
      id: "id",
      tag: "tags",
      index: [
        {
          field: "title",
          tokenize: "forward",
        },
        {
          field: "content",
          tokenize: "forward",
        },
        {
          field: "tags",
          tokenize: "forward",
        },
      ],
    },
  })

const indexes = {
  answers: createSearchIndex(),
  archive: createSearchIndex(),
}

const fetchContentCache: Map<FullSlug, Element[]> = new Map()
const contextWindowWords = 30
const numSearchResults = 12
const numTagResults = 5

type SearchShortcutEvent = Pick<
  KeyboardEvent,
  "altKey" | "ctrlKey" | "key" | "metaKey" | "repeat" | "shiftKey"
>

const tokenizeTerm = (term: string) => {
  const tokens = term.split(/\s+/).filter((t) => t.trim() !== "")
  const tokenLen = tokens.length
  if (tokenLen > 1) {
    for (let i = 1; i < tokenLen; i++) {
      tokens.push(tokens.slice(0, i + 1).join(" "))
    }
  }

  return tokens.sort((a, b) => b.length - a.length) // always highlight longest terms first
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const escapeHTML = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  )

function highlight(searchTerm: string, text: string, trim?: boolean) {
  const tokenizedTerms = tokenizeTerm(searchTerm)
  let tokenizedText = text.split(/\s+/).filter((t) => t !== "")

  let startIndex = 0
  let endIndex = tokenizedText.length - 1
  if (trim) {
    const includesCheck = (tok: string) =>
      tokenizedTerms.some((term) => tok.toLowerCase().startsWith(term.toLowerCase()))
    const occurrencesIndices = tokenizedText.map(includesCheck)

    let bestSum = 0
    let bestIndex = 0
    for (let i = 0; i < Math.max(tokenizedText.length - contextWindowWords, 0); i++) {
      const window = occurrencesIndices.slice(i, i + contextWindowWords)
      const windowSum = window.reduce((total, cur) => total + (cur ? 1 : 0), 0)
      if (windowSum >= bestSum) {
        bestSum = windowSum
        bestIndex = i
      }
    }

    startIndex = Math.max(bestIndex - contextWindowWords, 0)
    endIndex = Math.min(startIndex + 2 * contextWindowWords, tokenizedText.length - 1)
    tokenizedText = tokenizedText.slice(startIndex, endIndex)
  }

  const slice = tokenizedText
    .map((tok) => {
      // see if this tok is prefixed by any search terms
      for (const searchTok of tokenizedTerms) {
        if (tok.toLowerCase().includes(searchTok.toLowerCase())) {
          const regex = new RegExp(`(${escapeRegExp(searchTok)})`, "gi")
          return tok
            .split(regex)
            .map((part, index) =>
              index % 2 === 1
                ? `<span class="highlight">${escapeHTML(part)}</span>`
                : escapeHTML(part),
            )
            .join("")
        }
      }
      return escapeHTML(tok)
    })
    .join(" ")

  return `${startIndex === 0 ? "" : "..."}${slice}${
    endIndex === tokenizedText.length - 1 ? "" : "..."
  }`
}

function appendHighlightedMarkup(parent: HTMLElement, markup: string) {
  const html = new DOMParser().parseFromString(markup, "text/html")
  parent.append(...html.body.childNodes)
}

function highlightHTML(searchTerm: string, el: HTMLElement) {
  const p = new DOMParser()
  const tokenizedTerms = tokenizeTerm(searchTerm)
  const html = p.parseFromString(el.innerHTML, "text/html")

  const createHighlightSpan = (text: string) => {
    const span = document.createElement("span")
    span.className = "highlight"
    span.textContent = text
    return span
  }

  const highlightTextNodes = (node: Node, term: string) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const nodeText = node.nodeValue ?? ""
      const regex = new RegExp(escapeRegExp(term), "gi")
      const matches = nodeText.match(regex)
      if (!matches || matches.length === 0) return
      const spanContainer = document.createElement("span")
      let lastIndex = 0
      for (const match of matches) {
        const matchIndex = nodeText.indexOf(match, lastIndex)
        spanContainer.appendChild(document.createTextNode(nodeText.slice(lastIndex, matchIndex)))
        spanContainer.appendChild(createHighlightSpan(match))
        lastIndex = matchIndex + match.length
      }
      spanContainer.appendChild(document.createTextNode(nodeText.slice(lastIndex)))
      node.parentNode?.replaceChild(spanContainer, node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if ((node as HTMLElement).classList.contains("highlight")) return
      Array.from(node.childNodes).forEach((child) => highlightTextNodes(child, term))
    }
  }

  for (const term of tokenizedTerms) {
    highlightTextNodes(html.body, term)
  }

  return html.body
}

function isSearchShortcut(event: SearchShortcutEvent) {
  return (
    event.key.toLowerCase() === "k" &&
    (event.ctrlKey || event.metaKey) &&
    !event.altKey &&
    !event.shiftKey &&
    !event.repeat
  )
}

function focusWrapTarget<T>(focusable: readonly T[], active: T | null, backwards: boolean) {
  const first = focusable.at(0)
  const last = focusable.at(-1)
  if (!first || !last) return undefined
  if (!focusable.includes(active as T)) return backwards ? last : first
  if (backwards && active === first) return last
  if (!backwards && active === last) return first
  return undefined
}

async function setupSearch(searchElement: Element, currentSlug: FullSlug, data: ContentIndex) {
  const container = searchElement.querySelector(".search-container") as HTMLElement
  if (!container) return

  const sidebar = container.closest(".sidebar") as HTMLElement | null

  const searchButton = searchElement.querySelector(".search-button") as HTMLButtonElement
  if (!searchButton) return

  const searchBar = searchElement.querySelector(".search-bar") as HTMLInputElement
  if (!searchBar) return

  const searchLayout = searchElement.querySelector(".search-layout") as HTMLElement
  if (!searchLayout) return

  const scopeButtons = Array.from(
    searchElement.querySelectorAll<HTMLButtonElement>("[data-search-scope]"),
  )
  const closeButton = searchElement.querySelector(".search-close") as HTMLButtonElement | null
  let currentSearchScope: SearchScope = "answers"
  let searchInvoker: HTMLElement = searchButton
  let searchRevision = 0

  const idDataMap = Object.entries(data)
    .filter(
      ([_, details]) => details.searchScope === "answers" || details.searchScope === "archive",
    )
    .map(([slug]) => slug as FullSlug)
  const appendLayout = (el: HTMLElement) => {
    searchLayout.appendChild(el)
  }

  const enablePreview = searchLayout.dataset.preview === "true"
  let preview: HTMLDivElement | undefined = undefined
  let previewInner: HTMLDivElement | undefined = undefined
  const results = document.createElement("div")
  results.className = "results-container"
  appendLayout(results)

  if (enablePreview) {
    preview = document.createElement("div")
    preview.className = "preview-container"
    appendLayout(preview)
  }

  const updateScopeButtons = () => {
    for (const button of scopeButtons) {
      const isActive = button.dataset.searchScope === currentSearchScope
      button.setAttribute("aria-pressed", String(isActive))
    }
  }

  const setSearchScope = (scope: SearchScope, rerun = true) => {
    searchRevision++
    currentSearchScope = scope
    updateScopeButtons()
    if (rerun && searchBar.value.trim() !== "") {
      searchBar.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }

  function hideSearch() {
    searchRevision++
    container.classList.remove("active")
    searchBar.value = "" // clear the input when we dismiss the search
    if (sidebar) sidebar.style.zIndex = ""
    removeAllChildren(results)
    if (preview) {
      removeAllChildren(preview)
    }
    searchLayout.classList.remove("display-results")
    currentSearchTerm = ""
    currentHover = null
    setSearchScope("answers", false)
    const focusTarget =
      searchInvoker.isConnected && !container.contains(searchInvoker) ? searchInvoker : searchButton
    focusTarget.focus()
  }

  function showSearch(invoker?: HTMLElement, scope: SearchScope = "answers") {
    const activeElement = document.activeElement
    const candidate = invoker ?? (activeElement instanceof HTMLElement ? activeElement : null)
    searchInvoker =
      candidate &&
      candidate !== document.body &&
      candidate !== document.documentElement &&
      candidate.isConnected &&
      !container.contains(candidate)
        ? candidate
        : searchButton
    setSearchScope(scope, false)
    if (sidebar) sidebar.style.zIndex = "10000"
    container.classList.add("active")
    searchBar.focus()
  }

  let currentHover: HTMLInputElement | null = null
  async function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
    if (isSearchShortcut(e)) {
      e.preventDefault()
      const searchBarOpen = container.classList.contains("active")
      searchBarOpen ? hideSearch() : showSearch(document.activeElement as HTMLElement)
      return
    }

    if (currentHover) {
      currentHover.classList.remove("focus")
    }

    // If search is active, then we will render the first result and display accordingly
    if (!container.classList.contains("active")) return
    if (e.key === "Tab") {
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          "input:not([disabled]), button:not([disabled]), a[href]:not([hidden])",
        ),
      ).filter((element) => element.offsetParent !== null)
      const activeElement = document.activeElement
      const target = focusWrapTarget(
        focusable,
        activeElement instanceof HTMLElement ? activeElement : null,
        e.shiftKey,
      )
      if (target) {
        e.preventDefault()
        target.focus()
      }
      return
    }
    if (e.key === "Enter" && document.activeElement instanceof HTMLButtonElement) {
      // Scope, close, and recovery buttons keep their native keyboard behavior.
      return
    }
    if (e.key === "Enter" && !e.isComposing) {
      // If result has focus, navigate to that one, otherwise pick first result
      if (results.contains(document.activeElement)) {
        const active = document.activeElement as HTMLInputElement
        if (active.classList.contains("no-match")) return
        await displayPreview(active)
        active.click()
      } else {
        const anchor = document.getElementsByClassName("result-card")[0] as HTMLInputElement | null
        if (!anchor || anchor.classList.contains("no-match")) return
        await displayPreview(anchor)
        anchor.click()
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (results.contains(document.activeElement)) {
        // If an element in results-container already has focus, focus previous one
        const currentResult = currentHover
          ? currentHover
          : (document.activeElement as HTMLInputElement | null)
        const prevResult = currentResult?.previousElementSibling as HTMLInputElement | null
        currentResult?.classList.remove("focus")
        prevResult?.focus()
        if (prevResult) currentHover = prevResult
        await displayPreview(prevResult)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const activeResult = results.contains(document.activeElement)
        ? (document.activeElement as HTMLInputElement)
        : null
      const nextResult = activeResult
        ? (activeResult.nextElementSibling as HTMLInputElement | null)
        : (results.querySelector(".result-card:not(.no-match)") as HTMLInputElement | null)
      activeResult?.classList.remove("focus")
      nextResult?.focus()
      currentHover = nextResult
      await displayPreview(nextResult)
    }
  }

  const formatForDisplay = (id: number) => {
    const slug = idDataMap[id]
    const details = data[slug]
    return {
      id,
      slug,
      title: details.displayTitle ?? details.title ?? "",
      content: details.content ?? "",
      summary: details.description ?? "",
      tags: details.tags ?? [],
      verificationStatus: details.verificationStatus,
      searchScope: details.searchScope as SearchScope,
    }
  }

  function resolveUrl(slug: FullSlug): URL {
    return new URL(resolveRelative(currentSlug, slug), location.toString())
  }

  const resultToElement = (
    { slug, title, content, summary, tags, verificationStatus }: Item,
    term: string,
    type: SearchType,
  ) => {
    const itemTile = document.createElement("a")
    itemTile.classList.add("result-card")
    itemTile.id = slug
    itemTile.href = resolveUrl(slug).toString()

    const titleElement = document.createElement("h3")
    titleElement.className = "card-title"
    if (type === "tags") {
      titleElement.textContent = title
    } else {
      appendHighlightedMarkup(titleElement, highlight(term, title))
    }
    itemTile.appendChild(titleElement)

    if (verificationStatus === "historical-unverified") {
      const status = document.createElement("p")
      status.className = "result-status"
      status.textContent = "Historical · current compatibility unverified"
      itemTile.appendChild(status)
    }

    if (type === "tags" && tags.length > 0) {
      const tagList = document.createElement("ul")
      tagList.className = "tags"
      for (const tag of tags.slice(0, numTagResults)) {
        const tagItem = document.createElement("li")
        const tagText = document.createElement("p")
        if (tag.toLowerCase().includes(term.toLowerCase())) tagText.className = "match-tag"
        tagText.textContent = `#${tag}`
        tagItem.appendChild(tagText)
        tagList.appendChild(tagItem)
      }
      itemTile.appendChild(tagList)
    }

    if (summary) {
      const summaryElement = document.createElement("p")
      summaryElement.className = "card-summary"
      summaryElement.textContent = summary
      itemTile.appendChild(summaryElement)
    }

    const description = document.createElement("p")
    description.className = "card-description"
    appendHighlightedMarkup(description, highlight(term, content, true))
    itemTile.appendChild(description)

    const handler = (event: MouseEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      hideSearch()
    }

    async function onMouseEnter(ev: MouseEvent) {
      const target = ev.currentTarget as HTMLElement | null
      if (!target) return
      await displayPreview(target)
    }

    itemTile.addEventListener("mouseenter", onMouseEnter)
    window.addCleanup(() => itemTile.removeEventListener("mouseenter", onMouseEnter))
    itemTile.addEventListener("click", handler)
    window.addCleanup(() => itemTile.removeEventListener("click", handler))

    return itemTile
  }

  async function displayResults(
    finalResults: Item[],
    scope: SearchScope,
    revision: number,
    term: string,
    type: SearchType,
  ) {
    if (revision !== searchRevision || scope !== currentSearchScope) return
    removeAllChildren(results)
    if (finalResults.length === 0) {
      const noMatch = document.createElement("div")
      noMatch.className = "result-card no-match"
      noMatch.setAttribute("role", "status")
      const title = document.createElement("h3")
      title.textContent = `No matching ${scope === "answers" ? "answer" : "forum post"}.`
      noMatch.appendChild(title)
      if (scope === "answers") {
        const archiveAction = document.createElement("button")
        archiveAction.type = "button"
        archiveAction.className = "search-archive-action"
        archiveAction.textContent = "Search the forum archive"
        archiveAction.addEventListener("click", () => setSearchScope("archive"))
        noMatch.appendChild(archiveAction)
      } else {
        const guidance = document.createElement("p")
        guidance.textContent = "Try a shorter term or search by a PME feature name."
        noMatch.appendChild(guidance)
      }
      results.appendChild(noMatch)
    } else {
      results.append(...finalResults.map((result) => resultToElement(result, term, type)))
    }

    if (finalResults.length === 0 && preview) {
      // no results, clear previous preview
      removeAllChildren(preview)
    } else {
      // Preview the first result without stealing keyboard focus from the input.
      const firstChild = results.firstElementChild as HTMLElement
      firstChild.classList.add("focus")
      currentHover = null
      await displayPreview(firstChild, revision, term)
    }
  }

  async function fetchContent(slug: FullSlug): Promise<Element[]> {
    if (fetchContentCache.has(slug)) {
      return fetchContentCache.get(slug) as Element[]
    }

    const targetUrl = resolveUrl(slug).toString()
    const contents = await fetch(targetUrl)
      .then((res) => res.text())
      .then((contents) => {
        if (contents === undefined) {
          throw new Error(`Could not fetch ${targetUrl}`)
        }
        const html = new DOMParser().parseFromString(contents ?? "", "text/html")
        normalizeRelativeURLs(html, targetUrl)
        return [...html.getElementsByClassName("popover-hint")]
      })

    fetchContentCache.set(slug, contents)
    return contents
  }

  async function displayPreview(
    el: HTMLElement | null,
    revision = searchRevision,
    term = currentSearchTerm,
  ) {
    if (!searchLayout || !enablePreview || !el || !preview) return
    const slug = el.id as FullSlug
    const innerDiv = await fetchContent(slug).then((contents) =>
      contents.flatMap((el) => [...highlightHTML(term, el as HTMLElement).children]),
    )
    if (revision !== searchRevision) return
    previewInner = document.createElement("div")
    previewInner.classList.add("preview-inner")
    previewInner.append(...innerDiv)
    preview.replaceChildren(previewInner)

    // scroll to longest
    const highlights = [...preview.getElementsByClassName("highlight")].sort(
      (a, b) => (b.textContent?.length ?? 0) - (a.textContent?.length ?? 0),
    )
    highlights[0]?.scrollIntoView({ block: "start" })
  }

  async function onType(e: HTMLElementEventMap["input"]) {
    if (!searchLayout) return
    const revision = ++searchRevision
    const scope = currentSearchScope
    const rawTerm = (e.target as HTMLInputElement).value
    let term = rawTerm
    let resultType: SearchType = scope === "answers" && rawTerm.startsWith("#") ? "tags" : "basic"
    searchLayout.classList.toggle("display-results", rawTerm !== "")

    let searchResults: DefaultDocumentSearchResults<Item> = []
    const activeIndex = indexes[scope]
    if (resultType === "tags") {
      term = term.substring(1).trim()
      const separatorIndex = term.indexOf(" ")
      if (separatorIndex != -1) {
        // search by title and content index and then filter by tag (implemented in flexsearch)
        const tag = term.substring(0, separatorIndex)
        const query = term.substring(separatorIndex + 1).trim()
        searchResults = await activeIndex.searchAsync({
          query: query,
          // return at least 10000 documents, so it is enough to filter them by tag (implemented in flexsearch)
          limit: Math.max(numSearchResults, 10000),
          index: ["title", "content"],
          tag: { tags: tag },
        })
        for (let searchResult of searchResults) {
          searchResult.result = searchResult.result.slice(0, numSearchResults)
        }
        // set search type to basic and remove tag from term for proper highlightning and scroll
        resultType = "basic"
        term = query
      } else {
        // default search by tags index
        searchResults = await activeIndex.searchAsync({
          query: term,
          limit: numSearchResults,
          index: ["tags"],
        })
      }
    } else {
      searchResults = await activeIndex.searchAsync({
        query: term,
        limit: numSearchResults,
        index: ["title", "content"],
      })
    }

    if (revision !== searchRevision || scope !== currentSearchScope) return
    currentSearchTerm = term

    const getByField = (field: string): number[] => {
      const results = searchResults.filter((x) => x.field === field)
      return results.length === 0 ? [] : ([...results[0].result] as number[])
    }

    // order titles ahead of content
    const allIds: Set<number> = new Set([
      ...getByField("title"),
      ...getByField("content"),
      ...getByField("tags"),
    ])
    const finalResults = [...allIds].map(formatForDisplay)
    await displayResults(finalResults, scope, revision, term, resultType)
  }

  await fillDocument(data)
  document.addEventListener("keydown", shortcutHandler)
  window.addCleanup(() => document.removeEventListener("keydown", shortcutHandler))
  const searchButtonHandler = () => showSearch(searchButton, "answers")
  searchButton.addEventListener("click", searchButtonHandler)
  window.addCleanup(() => searchButton.removeEventListener("click", searchButtonHandler))
  const externalSearchHandler = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return
    const button = event.target.closest<HTMLElement>("[data-open-pme-search]")
    if (!button) return

    const requestedScope = button.dataset.openPmeSearch
    showSearch(button, requestedScope === "archive" ? "archive" : "answers")
  }
  document.addEventListener("click", externalSearchHandler)
  window.addCleanup(() => document.removeEventListener("click", externalSearchHandler))
  closeButton?.addEventListener("click", hideSearch)
  window.addCleanup(() => closeButton?.removeEventListener("click", hideSearch))
  for (const button of scopeButtons) {
    const handler = () => setSearchScope(button.dataset.searchScope as SearchScope)
    button.addEventListener("click", handler)
    window.addCleanup(() => button.removeEventListener("click", handler))
  }
  searchBar.addEventListener("input", onType)
  window.addCleanup(() => searchBar.removeEventListener("input", onType))

  registerEscapeHandler(container, hideSearch)
}

/**
 * Fills flexsearch document with data
 * @param index index to fill
 * @param data data to fill index with
 */
let indexPopulated = false
async function fillDocument(data: ContentIndex) {
  if (indexPopulated) return
  let id = 0
  const promises: Array<Promise<unknown>> = []
  for (const [slug, fileData] of Object.entries<ContentDetails>(data)) {
    if (fileData.searchScope !== "answers" && fileData.searchScope !== "archive") continue
    const documentId = id++
    const scope = fileData.searchScope
    promises.push(
      indexes[scope].addAsync(documentId, {
        id: documentId,
        slug: slug as FullSlug,
        title: fileData.displayTitle ?? fileData.title,
        content: fileData.content,
        summary: fileData.description ?? "",
        tags: fileData.tags,
        verificationStatus: fileData.verificationStatus,
        searchScope: scope,
      }),
    )
  }

  await Promise.all(promises)
  indexPopulated = true
}

if (typeof document !== "undefined") {
  document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
    const currentSlug = e.detail.url
    const data = await fetchData
    const searchElement = document.getElementsByClassName("search")
    for (const element of searchElement) {
      await setupSearch(element, currentSlug, data)
    }
  })
}

export { encoder, focusWrapTarget, highlight, isSearchShortcut }
