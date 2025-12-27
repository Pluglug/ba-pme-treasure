# CLAUDE.md

## Project Overview

**ba-pme-treasure** is a searchable web archive of 5,599 forum posts from the Blender Artists Pie Menu Editor (PME) community (2016-2025).

- **Live Site**: https://pluglug.github.io/ba-pme-treasure/
- **Built with**: Quartz 4 (static site generator for Obsidian vaults)
- **Deployed via**: GitHub Actions → GitHub Pages

## Repository Structure

```
ba-pme-treasure/           # This repo (public Quartz site)
├── content/               # Markdown content (5,599 posts + indexes)
│   ├── Posts/             # Forum posts organized by year
│   │   ├── 2016/ - 2025/
│   ├── Users/             # 380 user profile pages
│   ├── _Index/            # Timeline, Tag_Index, User_Index
│   ├── index.md           # Homepage
│   └── Dashboard.md       # Dataview queries (for Obsidian)
├── quartz/                # Quartz source code
├── quartz.config.ts       # Main configuration
├── quartz.layout.ts       # Layout configuration
└── fix_frontmatter.py     # Tag quoting script for YAML compatibility

ba-pme-treasure-dev/       # Separate repo (development/source)
├── obsidian_vault/        # Original Obsidian vault
├── exports/               # AI-friendly exports (posts.json, etc.)
└── scripts/               # Processing scripts
```

## Data Statistics

| Metric | Value |
|--------|-------|
| Total Posts | 5,599 |
| Contributors | 380 |
| Solved | 1,379 |
| Unsolved | 2,016 |
| Tags | 700+ |

### Top Topics
- Pie Menus (1,820 posts)
- Hotkey Configuration (1,519 posts)
- Macros (767 posts)
- Popup Dialogs (723 posts)
- Scripting (293 posts)

## Common Commands

```bash
# Install dependencies
npm install

# Local development
npx quartz build --serve

# Build for production
npx quartz build

# Fix frontmatter tags (if adding new content)
python fix_frontmatter.py
```

## Known Issues / TODO

### Current Problems
1. **Site feels sparse** - Needs better visual design
2. **Graph View too complex** - 5,599 nodes overwhelming
3. **Tags unorganized** - 700+ tags, no hierarchy displayed
4. **Navigation weak** - Hard to discover content

### Customization Opportunities
- `quartz.layout.ts` - Sidebar components, navigation
- `quartz.config.ts` - Graph View depth limits, plugins
- Custom CSS - Tag colors, cards, visual hierarchy
- `content/index.md` - Homepage with stats, featured content

## Post Frontmatter Format

```yaml
---
type: question          # question, answer, bug_report, feature_request, etc.
date: 2024-01-11 14:15:38
author: username
tags: ["#editor/pie-menu", "#topic/hotkeys", "#difficulty/intermediate", "#status/unsolved"]
post_number: 4991
url: https://blenderartists.org/t/662456/4991
quality_score: 5        # 1-10, AI-assigned
pme_features: ['Pie Menu Editor', 'Macro Editor']
---
```

## Deployment

Push to `main` triggers GitHub Actions workflow (`.github/workflows/deploy.yaml`):
1. npm ci
2. npx quartz build
3. Deploy to GitHub Pages

## Related Resources

- [PME on Gumroad](https://gum.co/pie_menu_editor)
- [Blender Artists Thread](https://blenderartists.org/t/pie-menu-editor-1-18-8/662456)
- [Quartz Documentation](https://quartz.jzhao.xyz/)
