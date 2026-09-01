import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, it } from "node:test"
import matter from "gray-matter"
import type { FilePath } from "../../util/path"
import { getSearchScope } from "./contentIndex"

describe("content index search scope", () => {
  it("keeps every raw forum post in the archive even if metadata asks otherwise", () => {
    assert.equal(
      getSearchScope("Posts/2024/post_05000.md" as FilePath, { search_scope: "answers" }),
      "archive",
    )
  })

  it("includes explicitly curated route surfaces in Answers", () => {
    const routes = [
      "Guides/routes/new-to-pme.md",
      "Guides/routes/solve-a-problem.md",
      "Guides/code-examples.md",
      "Guides/examples.md",
      "_Index/Browse.md",
    ] as FilePath[]

    for (const route of routes) {
      assert.equal(getSearchScope(route, { search_scope: "answers" }), "answers")
    }
  })

  it("keeps the required public route files explicitly opted into Answers", () => {
    const routes = [
      "Guides/routes/new-to-pme.md",
      "Guides/routes/solve-a-problem.md",
      "Guides/getting-started.md",
      "Guides/code-examples.md",
      "Guides/examples.md",
      "_Index/Browse.md",
    ]

    for (const route of routes) {
      const source = readFileSync(resolve("content", route), "utf8")
      const frontmatter = matter(source).data
      assert.equal(frontmatter.search_scope, "answers", `${route} must remain in Answers`)
      assert.equal(getSearchScope(route as FilePath, frontmatter), "answers")
    }
  })

  it("preserves the established curated answer directories", () => {
    assert.equal(getSearchScope("Guides/qa/example.md" as FilePath), "answers")
    assert.equal(getSearchScope("Guides/how-to/example.md" as FilePath), "answers")
    assert.equal(getSearchScope("Guides/reference/example.md" as FilePath), "answers")
    assert.equal(getSearchScope("Guides/diagnostics/example.md" as FilePath), "answers")
  })

  it("includes the current Getting Started Guide when it is explicitly curated", () => {
    assert.equal(
      getSearchScope("Guides/getting-started.md" as FilePath, { search_scope: "answers" }),
      "answers",
    )
  })

  it("fails closed for old guides and operational pages without an explicit scope", () => {
    assert.equal(getSearchScope("Guides/editor-overview.md" as FilePath), "other")
    assert.equal(getSearchScope("docs/internal-plan.md" as FilePath), "other")
  })
})
