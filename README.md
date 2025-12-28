# PME Treasure

A searchable web archive of **5,599 forum posts** from the [Blender Artists Pie Menu Editor thread](https://blenderartists.org/t/pie-menu-editor-1-18-8/662456) (2016–2025).

**Live Site**: https://pluglug.github.io/ba-pme-treasure/

> **Note**: This is NOT official PME documentation. It's a searchable archive / research vault built from the Blender Artists forum thread, primarily to support future PME documentation efforts.

## Features

- Full-text search across all posts
- Tag-based navigation with sorting/filtering
- Post type badges (question, answer, showcase, etc.)
- Mobile-friendly design
- Dark/light mode

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npx quartz build --serve

# Build for production
npx quartz build
```

## Project Structure

```
pme-treasure-web/
├── content/           # Markdown source files (Obsidian vault)
│   ├── Posts/         # Forum posts by year (2016-2025)
│   ├── Users/         # Contributor profiles
│   ├── Guides/        # Curated navigation guides
│   ├── _Index/        # Tag Index, Timeline, User Index
│   └── index.md       # Homepage
├── quartz/            # Quartz configuration & components
│   ├── components/    # Custom components (PageList, TagContent, etc.)
│   ├── plugins/       # Transformers, filters, emitters
│   └── styles/        # SCSS stylesheets
├── public/            # Build output (generated)
└── quartz.config.ts   # Site configuration
```

## Data Statistics

| Category | Count |
|----------|-------|
| Total Posts | 5,599 |
| Contributors | 760 |
| Solved Questions | 1,379 |
| Unsolved Questions | 2,016 |
| Years Covered | 10 (2016–2025) |

## Local Usage with Obsidian

To use this archive as a local knowledge base:

1. Clone the repository
2. Open **`content/`** directory as an Obsidian vault (not the repo root)
3. Only edit Markdown files under `content/`; Quartz files are for site generation

**Note**: The vault is large (5,599 posts), so initial indexing may take some time.

## Customization

Key files for customization:

| File | Purpose |
|------|---------|
| `quartz.config.ts` | Site title, theme colors, plugins |
| `quartz.layout.ts` | Page layout, components |
| `quartz/styles/custom.scss` | Custom CSS/SCSS |
| `quartz/components/PageList.tsx` | Post listing format |
| `quartz/components/pages/TagContent.tsx` | Tag page behavior |

## Built With

- [Quartz 4](https://quartz.jzhao.xyz/) - Static site generator for Obsidian
- [Obsidian](https://obsidian.md/) - Knowledge base format
- Claude - AI classification and data processing

## Related Projects

- [PME on Gumroad](https://gum.co/pie_menu_editor) - Original addon
- [PME-F Fork](https://github.com/Pluglug/pie-menu-editor-fork) - Community fork
- [PME Documentation](https://github.com/Pluglug/pme-docs) - Official documentation (WIP)

## License

- **Content**: Community-contributed; original authors retain rights
- **Code**: MIT License

## Credits

- Original PME addon by [roaoao](https://gum.co/pie_menu_editor)
- Data extracted from [Blender Artists](https://blenderartists.org/)
- Archive maintained by [Pluglug](https://github.com/Pluglug)
