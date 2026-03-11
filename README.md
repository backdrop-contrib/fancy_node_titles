# Fancy Node Titles

Allows site architects to enable rich HTML markup in node titles on a
per-content-type basis. Includes a **Display Title** field that lets editors
provide a fully formatted version of the title for front-end display while
keeping the real node title clean for URLs, admin listings, RSS feeds, and
search indexes.

## Features

- Enable HTML titles per content type
- Configurable allowed tags per content type (comma-separated text field)
- **Display Title** field — an optional override that appears on node edit
  forms, keeping the node title plain while allowing HTML on the front end
- Display Title visibility: always visible or shown on demand via a toggle link
- Tag-insertion toolbar on the Display Title field with one button per allowed
  tag — wraps selected text or places the cursor between tags
- **Clear** button strips all HTML tags from the Display Title value
- Void elements (e.g. `<br>`) are inserted without a closing tag
- Browser tab `<title>` always displays plain text (HTML is stripped
  automatically)

## Installation

Install and enable as you would any Backdrop contrib module. No additional
configuration is required after enabling — settings are managed per content
type.

## Configuration

1. Go to `admin/structure/types` and edit a content type.
2. Open the **HTML Title** vertical tab.
3. Check **Allow HTML in title** to enable the feature.
4. Enter the **Allowed tags** as a comma-separated list
   (e.g. `strong, em, sup, sub`). Tag names only — no angle brackets required.
5. Choose the **Display title field** visibility:
   - **Show on demand** — a toggle link appears on the node edit form;
     clicking it reveals the Display Title field. If a Display Title is already
     saved it is shown immediately.
   - **Always visible** — the Display Title field is always shown.
6. Save the content type.

On node edit forms for enabled content types, a **Display Title** field will
appear below the title with a tag-insertion toolbar.

## How it works

When a Display Title is saved for a node, it is used as the visible H1 heading
and in teasers. The node title is preserved as plain text and continues to
drive the URL alias, admin content list, RSS feeds, and browser tab.

When no Display Title is set, the node title is used for display (with HTML
filtering applied if it contains markup).

## Requirements

- Node module (Backdrop core)

## Issues

Bugs and feature requests should be reported in the
[Issue Queue](https://github.com/backdrop-contrib/html_title/issues).

## Current Maintainers

- [Tim Erickson](https://github.com/stpaultim)

## Credits

- Created by [Tim Erickson](https://github.com/stpaultim).
- Supported by [Simplo](https://simplo.site).

## License

This project is GPL v2 software. See the [LICENSE.txt](LICENSE.txt) file in
this directory for complete text.
