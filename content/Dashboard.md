# PME Treasure Dashboard

> Note: This dashboard uses Dataview plugin features. On the web version, these queries won't run, but you can view the data through the search and tag pages.

---

## Statistics Overview

### By Post Type

```dataview
TABLE WITHOUT ID
  choice(type = "question", "Question",
  choice(type = "answer", "Answer",
  choice(type = "bug_report", "Bug Report",
  choice(type = "feature_request", "Feature Request",
  choice(type = "showcase", "Showcase",
  choice(type = "discussion", "Discussion",
  choice(type = "announcement", "Announcement", type))))))) as "Type",
  length(rows) as "Count"
FROM "Posts"
GROUP BY type
SORT length(rows) DESC
```

---

## High-Quality Unsolved Questions (Top 20)

```dataview
TABLE
  author as "Author",
  dateformat(date, "yyyy-MM-dd") as "Date",
  quality_score as "Quality"
FROM "Posts"
WHERE contains(tags, "#status/unsolved") AND quality_score >= 7
SORT quality_score DESC, date DESC
LIMIT 20
```

---

## Posts by Editor Type

```dataview
TABLE WITHOUT ID
  "Pie Menu" as "Editor",
  length(filter(rows, (r) => contains(r.tags, "#editor/pie-menu"))) as "Count"
FROM "Posts"
GROUP BY true

TABLE WITHOUT ID
  "Macro" as "Editor",
  length(filter(rows, (r) => contains(r.tags, "#editor/macro"))) as "Count"
FROM "Posts"
GROUP BY true

TABLE WITHOUT ID
  "Popup Dialog" as "Editor",
  length(filter(rows, (r) => contains(r.tags, "#editor/popup-dialog"))) as "Count"
FROM "Posts"
GROUP BY true
```

---

## Solved Posts (Latest 20)

```dataview
TABLE
  author as "Author",
  dateformat(date, "yyyy-MM-dd") as "Date",
  quality_score as "Quality"
FROM "Posts"
WHERE contains(tags, "#status/solved")
SORT date DESC
LIMIT 20
```

---

## Distribution by Difficulty

```dataview
TABLE WITHOUT ID
  choice(contains(tags, "#difficulty/beginner"), "Beginner",
  choice(contains(tags, "#difficulty/intermediate"), "Intermediate",
  choice(contains(tags, "#difficulty/advanced"), "Advanced", "Unclassified"))) as "Difficulty",
  length(rows) as "Count"
FROM "Posts"
GROUP BY choice(contains(tags, "#difficulty/beginner"), "beginner",
         choice(contains(tags, "#difficulty/intermediate"), "intermediate",
         choice(contains(tags, "#difficulty/advanced"), "advanced", "unset")))
SORT length(rows) DESC
```

---

## Scripting-Related Posts (High Quality)

```dataview
TABLE
  author as "Author",
  dateformat(date, "yyyy-MM-dd") as "Date",
  type as "Type"
FROM "Posts"
WHERE (contains(tags, "#topic/scripting") OR contains(tags, "#topic/python-scripting"))
  AND quality_score >= 6
SORT quality_score DESC
LIMIT 30
```

---

## Hotkey Conflict Issues

```dataview
TABLE
  author as "Author",
  dateformat(date, "yyyy-MM-dd") as "Date",
  choice(contains(tags, "#status/solved"), "Solved", "Unsolved") as "Status"
FROM "Posts"
WHERE contains(tags, "#topic/hotkeys/conflicts")
SORT date DESC
LIMIT 30
```

---

## Recent Posts (Last 30 Days)

```dataview
TABLE
  author as "Author",
  type as "Type",
  quality_score as "Quality"
FROM "Posts"
WHERE date >= date(today) - dur(30 days)
SORT date DESC
LIMIT 30
```

---

## Top Contributors

```dataview
TABLE WITHOUT ID
  author as "User",
  length(rows) as "Posts"
FROM "Posts"
GROUP BY author
SORT length(rows) DESC
LIMIT 15
```

---

## Quick Links

- [[_Index/Timeline|Timeline]]
- [[_Index/Tag_Index|Tag Index]]
- [[_Index/User_Index|User Index]]

---

## Search Tips

Use Obsidian's search (on desktop) with these queries:

```
tag:#status/unsolved tag:#editor/pie-menu    // Unsolved pie menu questions
tag:#difficulty/advanced tag:#topic/scripting // Advanced scripting topics
path:Posts quality_score:9                    // High quality posts
```

---

**For Obsidian Users**: Download the vault from the repository to use these interactive Dataview queries locally.
