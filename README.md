# Fancy Node Titles

Allows site architects to enable rich HTML markup, display title overrides, and
icon prefixes in node titles on a per-content-type basis. The real node title
stays plain text for URLs, admin listings, RSS feeds, and search indexes — all
the "fancy" formatting lives in a separate Display Title field.

## Features

- Enable per content type from the content type settings form
- Configurable allowed HTML tags per content type (comma-separated text field)
- **Display Title** field — an optional override that appears on node edit
  forms, keeping the node title plain while allowing HTML markup on the
  front end
- **Title Icon** field — prepends a Phosphor icon (from Backdrop's built-in
  icon set) before the title on the front end
- Display Title and Icon field visibility: always visible or shown on demand
  via a toggle link
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

The [Icon Browser](https://backdropcms.org/project/icon_browser) module is
optional but recommended. When installed, a "Browse available icons" link
appears on node edit forms to help editors find and preview Phosphor icon names.

## Configuration

1. Go to `admin/structure/types` and edit a content type.
2. Open the **Fancy Node Titles** vertical tab.
3. Check **Enable Fancy Node Titles**.
4. Enter the **Allowed tags** as a comma-separated list
   (e.g. `strong, em, sup, sub`). Tag names only — no angle brackets required.
5. Choose the **Display title and icon fields** visibility:
   - **Show on demand** — a `+ Customize title display` toggle link appears on
     the node edit form; clicking it reveals the Display Title and Icon fields.
     Fields are shown immediately if a value is already saved.
   - **Always visible** — both fields are always shown on the node edit form.
6. Save the content type.

## How it works

### Display Title

On node edit forms for enabled content types, a **Display Title** field appears
below the title field with a tag-insertion toolbar. When a Display Title is
saved, it is used as the visible H1 heading and in teasers. The node title is
preserved as plain text and continues to drive the URL alias, admin content
list, RSS feeds, and browser tab.

When no Display Title is set, the node title is used for display (with HTML
filtering applied if it contains markup).

### Title Icon

A **Title Icon** field accepts any Phosphor icon name (e.g. `star`,
`heart-fill`, `dog`). When set, the corresponding SVG icon is rendered before
the title on the front end, sized to match the surrounding text. The icon does
not appear in the browser tab, admin listings, or RSS feeds.

Backdrop CMS includes the full Phosphor icon set in core. To explore available
icons, install the optional
[Icon Browser](https://backdropcms.org/project/icon_browser) module and visit
`admin/config/media/icons/browse`.

## Notes About Use of AI

This module was developed with assistance from AI tools. AI was used to generate code, plan features, and make iterative improvements throughout development.

## Issues

Bugs and feature requests should be reported in the
[Issue Queue](https://github.com/backdrop-contrib/fancy_node_titles/issues).

## Current Maintainers

- [Tim Erickson](https://github.com/stpaultim)

## Credits

- Created by [Tim Erickson](https://github.com/stpaultim).
- Supported by [Simplo](https://simplo.site).

## License

This project is GPL v2 software. See the [LICENSE.txt](LICENSE.txt) file in
this directory for complete text.
