import { Root } from "mdast"
import { toString } from "mdast-util-to-string"
import { QuartzTransformerPlugin } from "../types"

function isArchivePost(relativePath: string | undefined): boolean {
  return relativePath?.replaceAll("\\", "/").startsWith("Posts/") ?? false
}

function humanizePostType(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  return value
    .split("_")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ")
}

function normalizeHeading(node: Root["children"][number]): string {
  return toString(node)
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .trim()
    .toLowerCase()
}

/**
 * Remove a depth-2 heading (matched by its emoji-stripped, lowercased text)
 * together with the single paragraph or list that follows it.
 */
function removeSection(children: Root["children"], headingText: string): void {
  const index = children.findIndex(
    (node) => node.type === "heading" && node.depth === 2 && normalizeHeading(node) === headingText,
  )
  if (index === -1) return

  const next = children[index + 1]?.type
  const removeCount = next === "paragraph" || next === "list" ? 2 : 1
  children.splice(index, removeCount)
}

/**
 * Keep the imported forum taxonomy as evidence without publishing it as a
 * discovery system. Raw posts are searchable in the Forum archive, while
 * public topic tags are reserved for editorially reviewed answer pages.
 *
 * AI-assigned classification data (quality score, feature list) stays in the
 * source vault as processing evidence but is neither shown on the public page
 * nor indexed for search. This runs before the Description plugin, which is
 * what populates the search index text.
 */
export const ArchiveDiscoveryBoundary: QuartzTransformerPlugin = () => ({
  name: "ArchiveDiscoveryBoundary",
  markdownPlugins() {
    return [
      () => (tree: Root, file) => {
        if (!isArchivePost(file.data.relativePath)) return

        const frontmatter = file.data.frontmatter
        if (frontmatter) {
          frontmatter.archive_tags = frontmatter.tags ?? []
          frontmatter.tags = []

          const postNumber = frontmatter.post_number
          const author = frontmatter.author
          const postType = humanizePostType(frontmatter.type)
          frontmatter.title = [
            typeof postNumber === "string" || typeof postNumber === "number"
              ? `Post #${postNumber}`
              : undefined,
            typeof author === "string" ? author : undefined,
            postType,
          ]
            .filter(Boolean)
            .join(" · ")
        }

        const children = tree.children
        const generatedTitleIndex = children.findIndex(
          (node) =>
            node.type === "heading" && node.depth === 1 && toString(node).startsWith("Post #"),
        )
        if (generatedTitleIndex !== -1) children.splice(generatedTitleIndex, 1)

        const metadataIndex = children.findIndex(
          (node) =>
            node.type === "heading" && node.depth === 2 && normalizeHeading(node) === "metadata",
        )
        const metadataList = children[metadataIndex + 1]
        if (metadataIndex !== -1 && metadataList?.type === "list") {
          metadataList.children = metadataList.children.filter(
            (item) => !toString(item).trim().startsWith("Quality Score"),
          )
        }

        removeSection(children, "related pme features")
        removeSection(children, "tags")
      },
    ]
  },
})
