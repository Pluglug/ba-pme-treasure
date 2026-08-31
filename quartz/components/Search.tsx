import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/search.scss"
// @ts-ignore
import script from "./scripts/search.inline"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

export interface SearchOptions {
  enablePreview: boolean
}

const defaultOptions: SearchOptions = {
  enablePreview: true,
}

export default ((userOpts?: Partial<SearchOptions>) => {
  const Search: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const opts = { ...defaultOptions, ...userOpts }
    const searchPlaceholder = i18n(cfg.locale).components.search.searchBarPlaceholder
    return (
      <div class={classNames(displayClass, "search")}>
        <button class="search-button">
          <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
            <title>Search</title>
            <g class="search-path" fill="none">
              <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
              <circle cx="8" cy="8" r="7" />
            </g>
          </svg>
          <p>{i18n(cfg.locale).components.search.title}</p>
        </button>
        <div class="search-container" role="dialog" aria-modal="true" aria-label="Search PME">
          <div class="search-space">
            <div class="search-controls">
              <input
                autocomplete="off"
                class="search-bar"
                name="search"
                type="search"
                aria-label={searchPlaceholder}
                placeholder={searchPlaceholder}
              />
              <div class="search-scope" role="group" aria-label="Search in">
                <button type="button" data-search-scope="answers" aria-pressed="true">
                  Answers
                </button>
                <button type="button" data-search-scope="archive" aria-pressed="false">
                  Forum archive
                </button>
              </div>
              <button type="button" class="search-close" aria-label="Close search">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="search-layout" data-preview={opts.enablePreview}></div>
          </div>
        </div>
      </div>
    )
  }

  Search.afterDOMLoaded = script
  Search.css = style

  return Search
}) satisfies QuartzComponentConstructor
