import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

export function byDateAndAlphabeticalFolderFirst(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort folders first
    const f1IsFolder = isFolderPath(f1.slug ?? "")
    const f2IsFolder = isFolderPath(f2.slug ?? "")
    if (f1IsFolder && !f2IsFolder) return -1
    if (!f1IsFolder && f2IsFolder) return 1

    // If both are folders or both are files, sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

type Props = {
  limit?: number
  sort?: SortFn
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []
        // Extract additional post metadata
        const author = page.frontmatter?.author as string | undefined
        const postType = page.frontmatter?.type as string | undefined
        const postNumber = page.frontmatter?.post_number as string | number | undefined
        const description = page.description
        const isArchivePost = page.relativePath?.replaceAll("\\", "/").startsWith("Posts/") ?? false
        const humanPostType = postType
          ?.split("_")
          .filter(Boolean)
          .map((part) => part[0]?.toUpperCase() + part.slice(1))
          .join(" ")
        const displayTitle = isArchivePost
          ? [postNumber ? `Post #${postNumber}` : title, author, humanPostType]
              .filter(Boolean)
              .join(" · ")
          : title
        const isHistorical = page.frontmatter?.verification_status === "historical-unverified"
        const archiveExcerpt = description
          ?.split("📋 Metadata", 1)[0]
          .replace(/^Post #\d+:\s*/i, "")
          .trim()
        // Truncate description to ~100 characters
        const shortDesc = isArchivePost
          ? archiveExcerpt && !archiveExcerpt.startsWith("![](")
            ? archiveExcerpt.length > 100
              ? archiveExcerpt.slice(0, 100) + "..."
              : archiveExcerpt
            : undefined
          : description && description.length > 100
            ? description.slice(0, 100) + "..."
            : description

        return (
          <li class="section-li">
            <div class="section">
              <p class="meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
              </p>
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {displayTitle}
                  </a>
                </h3>
                {isHistorical && (
                  <p class="historical-status">Historical · current compatibility unverified</p>
                )}
                {/* Post metadata: author and type */}
                {(author || postType) && (
                  <p class="post-meta-line">
                    {postType && <span class={`post-type post-type-${postType}`}>{postType}</span>}
                    {author && <span class="post-author">by {author}</span>}
                  </p>
                )}
                {/* Short description */}
                {shortDesc && <p class="post-excerpt">{shortDesc}</p>}
              </div>
              <ul class="tags">
                {tags.map((tag) => (
                  <li>
                    <a
                      class="internal tag-link"
                      href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                    >
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}

.post-meta-line {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.historical-status {
  margin: 0.3rem 0 0;
  color: var(--darkgray);
  font-size: 0.8rem;
  font-weight: 600;
}

.post-type {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.post-type-question { background: rgba(139, 92, 246, 0.2); color: #a78bfa; }
.post-type-answer { background: rgba(16, 185, 129, 0.2); color: #34d399; }
.post-type-discussion { background: rgba(107, 165, 224, 0.2); color: #6BA5E0; }
.post-type-showcase { background: rgba(245, 166, 35, 0.2); color: #F5A623; }
.post-type-bug_report { background: rgba(239, 68, 68, 0.2); color: #f87171; }
.post-type-announcement { background: rgba(232, 125, 13, 0.2); color: #E87D0D; }

.post-author {
  color: var(--gray);
  font-style: italic;
}

.post-excerpt {
  margin: 0.35rem 0 0 0;
  font-size: 0.85rem;
  color: var(--darkgray);
  line-height: 1.4;
  opacity: 0.85;
}
`
