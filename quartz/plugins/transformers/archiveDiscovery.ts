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

/**
 * Keep the imported forum taxonomy as evidence without publishing it as a
 * discovery system. Raw posts are searchable in the Forum archive, while
 * public topic tags are reserved for editorially reviewed answer pages.
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

        const tagHeadingIndex = children.findIndex(
          (node) =>
            node.type === "heading" &&
            node.depth === 2 &&
            toString(node).replace("🏷️", "").trim().toLowerCase() === "tags",
        )

        if (tagHeadingIndex === -1) return

        const removeCount = children[tagHeadingIndex + 1]?.type === "paragraph" ? 2 : 1
        children.splice(tagHeadingIndex, removeCount)
      },
    ]
  },
})
