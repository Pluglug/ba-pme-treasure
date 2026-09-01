import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"

export type ContentIndexMap = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  slug: FullSlug
  filePath: FilePath
  title: string
  displayTitle: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
  contentType?: string
  verificationStatus?: string
  searchScope: "answers" | "archive" | "other"
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  rssLimit?: number
  rssFullHtml: boolean
  rssSlug: string
  includeEmptyFiles: boolean
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  rssSlug: "index",
  includeEmptyFiles: true,
}

function scalarFrontmatterValue(value: unknown): string | undefined {
  if (typeof value === "string" || typeof value === "number") return String(value)
  return undefined
}

function humanizePostType(value: string | undefined): string | undefined {
  if (!value) return undefined
  return value
    .split("_")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ")
}

export function getSearchScope(
  filePath: FilePath,
  frontmatter: Record<string, unknown> = {},
): ContentDetails["searchScope"] {
  if (/^Posts\//.test(filePath)) return "archive"

  const explicitScope = scalarFrontmatterValue(frontmatter.search_scope)
  if (explicitScope === "answers" || explicitScope === "other") return explicitScope

  // Existing curated answer directories remain searchable without requiring a
  // metadata migration. Other public routes opt in explicitly so old guides
  // and operational notes do not silently enter the Answers scope.
  if (/^Guides\/(qa|how-to|reference|diagnostics)\//.test(filePath)) return "answers"
  return "other"
}

function getDisplayTitle(filePath: FilePath, title: string, frontmatter: Record<string, unknown>) {
  if (!/^Posts\//.test(filePath)) return title

  const postNumber = scalarFrontmatterValue(frontmatter.post_number)
  const author = scalarFrontmatterValue(frontmatter.author)
  const postType = humanizePostType(scalarFrontmatterValue(frontmatter.type))
  return [postNumber ? `Post #${postNumber}` : title, author, postType].filter(Boolean).join(" · ")
}

function getSearchDescription(filePath: FilePath, description: string) {
  if (!/^Posts\//.test(filePath)) return description

  const excerpt = description
    .split("📋 Metadata", 1)[0]
    .replace(/^Post #\d+:\s*/i, "")
    .trim()
  if (!excerpt || excerpt.startsWith("![](")) return ""
  return excerpt.length > 180 ? `${excerpt.slice(0, 180)}...` : excerpt
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndexMap): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${content.date && `<lastmod>${content.date.toISOString()}</lastmod>`}
  </url>`
  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndexMap, limit?: number): string {
  const base = cfg.baseUrl ?? ""

  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <description><![CDATA[ ${content.richContent ?? content.description} ]]></description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`

  const items = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
        cfg.pageTitle,
      )}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const linkIndex: ContentIndexMap = new Map()
      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()
        if (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) {
          const frontmatter = file.data.frontmatter ?? { title: "" }
          const title = frontmatter.title
          linkIndex.set(slug, {
            slug,
            filePath: file.data.relativePath!,
            title,
            displayTitle: getDisplayTitle(file.data.relativePath!, title, frontmatter),
            links: file.data.links ?? [],
            tags: frontmatter.tags ?? [],
            content: file.data.text ?? "",
            richContent: opts?.rssFullHtml
              ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
              : undefined,
            date: date,
            description: getSearchDescription(file.data.relativePath!, file.data.description ?? ""),
            contentType: scalarFrontmatterValue(frontmatter.content_type),
            verificationStatus: scalarFrontmatterValue(frontmatter.verification_status),
            searchScope: getSearchScope(file.data.relativePath!, frontmatter),
          })
        }
      }

      if (opts?.enableSiteMap) {
        yield write({
          ctx,
          content: generateSiteMap(cfg, linkIndex),
          slug: "sitemap" as FullSlug,
          ext: ".xml",
        })
      }

      if (opts?.enableRSS) {
        yield write({
          ctx,
          content: generateRSSFeed(cfg, linkIndex, opts.rssLimit),
          slug: (opts?.rssSlug ?? "index") as FullSlug,
          ext: ".xml",
        })
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      const simplifiedIndex = Object.fromEntries(
        Array.from(linkIndex).map(([slug, content]) => {
          // Dates are only needed for RSS/sitemap generation. Search keeps the
          // short description and editorial metadata for useful result cards.
          delete content.date
          return [slug, content]
        }),
      )

      yield write({
        ctx,
        content: JSON.stringify(simplifiedIndex),
        slug: fp,
        ext: ".json",
      })
    },
    externalResources: (ctx) => {
      if (opts?.enableRSS) {
        return {
          additionalHead: [
            <link
              rel="alternate"
              type="application/rss+xml"
              title="RSS Feed"
              href={`https://${ctx.cfg.configuration.baseUrl}/index.xml`}
            />,
          ],
        }
      }
    },
  }
}
