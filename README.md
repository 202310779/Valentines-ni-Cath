# Calentince for Cath 💖

A tiny, single-page Valentine surprise with soft floating hearts, a love letter modal, and an optional gentle background tone.

## Files
- `index.html` — main page
- `styles.css` — theme and animations
- `script.js` — hearts, modal, and music toggle
- `photos/` — gallery images (SVG placeholders included)

## Run
- Windows: double-click `index.html` to open in your browser.
- Or open the folder in VS Code and use the Live Server extension to preview.

## Customize
- Change the title or hero text in `index.html` (`Happy Calentince, Cath`).
- Edit colors in `styles.css` (root variables).
- Update love letter copy inside the `<dialog>` in `index.html`.
 - Add your photos: place JPEG/PNG files into the `photos` folder and update the image `src`/`href` in the gallery section of `index.html`. Keep alt text meaningful.

### Gallery tips
- You can add more items by duplicating a `gallery-item` block and adjusting `data-index`. The lightbox will adapt automatically.
- Use `loading="lazy"` for smoother performance.

Enjoy, and happy Calentince! 💌
