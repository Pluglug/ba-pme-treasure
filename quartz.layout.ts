import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Custom sort function for Explorer to prioritize certain folders
const explorerSortFn = (a: any, b: any) => {
  // Priority order for folders
  const folderPriority: Record<string, number> = {
    "Guides": 1,
    "Practical answers": 1,
    "_Index": 2,
    "Users": 3,
    "Posts": 4,
  }

  const aPriority = folderPriority[a.displayName] ?? 100
  const bPriority = folderPriority[b.displayName] ?? 100

  // If both have priority, sort by priority
  if (aPriority !== 100 || bPriority !== 100) {
    return aPriority - bPriority
  }

  // Default: folders first, then alphabetical
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }

  return !a.isFolder && b.isFolder ? 1 : -1
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "PME on Gumroad": "https://gum.co/pie_menu_editor",
      "PME-F Fork": "https://github.com/Pluglug/pie-menu-editor-fork",
      "Blender Artists": "https://blenderartists.org/t/662456",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "Browse",
      folderDefaultState: "collapsed",
      sortFn: explorerSortFn,
    }),
  ],
  right: [
    Component.Graph({
      localGraph: { depth: 1, showTags: false, focusOnHover: true },
      globalGraph: { depth: 2, showTags: false, focusOnHover: true },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "Browse",
      folderDefaultState: "collapsed",
      sortFn: explorerSortFn,
    }),
  ],
  right: [],
}
