# PME Treasure Dashboard

> Dataviewプラグインが必要です: Settings → Community plugins → Browse → "Dataview" をインストール

---

## 統計概要

### 投稿タイプ別

```dataview
TABLE WITHOUT ID
  choice(type = "question", "質問",
  choice(type = "answer", "回答",
  choice(type = "bug_report", "バグ報告",
  choice(type = "feature_request", "機能要望",
  choice(type = "showcase", "作品紹介",
  choice(type = "discussion", "議論",
  choice(type = "announcement", "お知らせ", type))))))) as "タイプ",
  length(rows) as "件数"
FROM "Posts"
GROUP BY type
SORT length(rows) DESC
```

---

## 未解決の高品質な質問 (Top 20)

```dataview
TABLE
  author as "投稿者",
  dateformat(date, "yyyy-MM-dd") as "日付",
  quality_score as "品質"
FROM "Posts"
WHERE contains(tags, "#status/unsolved") AND quality_score >= 7
SORT quality_score DESC, date DESC
LIMIT 20
```

---

## エディタ別 投稿数

```dataview
TABLE WITHOUT ID
  "Pie Menu" as "エディタ",
  length(filter(rows, (r) => contains(r.tags, "#editor/pie-menu"))) as "件数"
FROM "Posts"
GROUP BY true

TABLE WITHOUT ID
  "Macro" as "エディタ",
  length(filter(rows, (r) => contains(r.tags, "#editor/macro"))) as "件数"
FROM "Posts"
GROUP BY true

TABLE WITHOUT ID
  "Popup Dialog" as "エディタ",
  length(filter(rows, (r) => contains(r.tags, "#editor/popup-dialog"))) as "件数"
FROM "Posts"
GROUP BY true
```

---

## 解決済み投稿 (最新20件)

```dataview
TABLE
  author as "投稿者",
  dateformat(date, "yyyy-MM-dd") as "日付",
  quality_score as "品質"
FROM "Posts"
WHERE contains(tags, "#status/solved")
SORT date DESC
LIMIT 20
```

---

## 難易度別分布

```dataview
TABLE WITHOUT ID
  choice(contains(tags, "#difficulty/beginner"), "初級",
  choice(contains(tags, "#difficulty/intermediate"), "中級",
  choice(contains(tags, "#difficulty/advanced"), "上級", "未分類"))) as "難易度",
  length(rows) as "件数"
FROM "Posts"
GROUP BY choice(contains(tags, "#difficulty/beginner"), "beginner",
         choice(contains(tags, "#difficulty/intermediate"), "intermediate",
         choice(contains(tags, "#difficulty/advanced"), "advanced", "unset")))
SORT length(rows) DESC
```

---

## スクリプティング関連 (高品質順)

```dataview
TABLE
  author as "投稿者",
  dateformat(date, "yyyy-MM-dd") as "日付",
  type as "タイプ"
FROM "Posts"
WHERE (contains(tags, "#topic/scripting") OR contains(tags, "#topic/python-scripting"))
  AND quality_score >= 6
SORT quality_score DESC
LIMIT 30
```

---

## ホットキー競合問題

```dataview
TABLE
  author as "投稿者",
  dateformat(date, "yyyy-MM-dd") as "日付",
  choice(contains(tags, "#status/solved"), "解決", "未解決") as "状態"
FROM "Posts"
WHERE contains(tags, "#topic/hotkeys/conflicts")
SORT date DESC
LIMIT 30
```

---

## 最近の投稿 (30日以内)

```dataview
TABLE
  author as "投稿者",
  type as "タイプ",
  quality_score as "品質"
FROM "Posts"
WHERE date >= date(today) - dur(30 days)
SORT date DESC
LIMIT 30
```

---

## トップ貢献者

```dataview
TABLE WITHOUT ID
  author as "ユーザー",
  length(rows) as "投稿数"
FROM "Posts"
GROUP BY author
SORT length(rows) DESC
LIMIT 15
```

---

## クイックリンク

- [[_Index/Timeline|タイムライン]]
- [[_Index/Tag_Index|タグ一覧]]
- [[_Index/User_Index|ユーザー一覧]]

---

## フィルタリング Tips

Obsidianの検索で以下のクエリが使えます：

```
tag:#status/unsolved tag:#editor/pie-menu    // 未解決のパイメニュー質問
tag:#difficulty/advanced tag:#topic/scripting // 上級スクリプティング
path:Posts quality_score:9                    // 高品質投稿
```
