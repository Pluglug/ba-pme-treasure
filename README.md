# PME Treasure

A searchable web archive of 5,599 forum posts from the [Blender Artists Pie Menu Editor community](https://blenderartists.org/t/pie-menu-editor-1-18-8/662456) (2016-2025).

**Live Site**: https://pluglug.github.io/ba-pme-treasure/

## Features

- Full-text search across all posts
- Interactive graph view of connections
- Tag-based navigation
- Mobile-friendly design
- Dark/light mode

## Data

This knowledge base contains:

| Category | Count |
|----------|-------|
| Total Posts | 5,599 |
| Contributors | 380 |
| Solved Questions | 1,379 |
| Unsolved Questions | 2,016 |

### Topics

- Pie Menus (1,820 posts)
- Hotkey Configuration (1,519 posts)
- Macros (767 posts)
- Popup Dialogs (723 posts)
- Scripting (293 posts)

## AI-Friendly Exports

Available in the `exports/` directory of the source repo:

- `posts.json` - Full dataset (5MB)
- `statistics.md` - Summary statistics
- `topic_*.md` - Topic-specific compilations

## Development

```bash
# Install dependencies
npm install

# Start dev server
npx quartz build --serve

# Build for production
npx quartz build
```

## Built With

- [Quartz](https://quartz.jzhao.xyz/) - Static site generator
- [Obsidian](https://obsidian.md/) - Knowledge base format

## License

Content: Community-contributed, original authors retain rights
Code: MIT License

## Credits

- Original PME addon by [roaoao](https://gum.co/pie_menu_editor)
- Data extracted from [Blender Artists](https://blenderartists.org/)
- AI classification powered by Claude
