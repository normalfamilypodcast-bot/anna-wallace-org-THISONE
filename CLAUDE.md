# Anna Wallace — site rules for Claude

## Voice and tone

- Write in plain, warm, first-person voice
- Sentence case everywhere: only capitalise the first word of a heading and proper nouns
- **No em dashes (—) anywhere on the site.** Use a comma, colon, or full stop instead. This rule is absolute.
- No jargon, no corporate language
- Short sentences preferred
- Contractions are fine (I'm, you're, it's)

## Capitalisation

- Headings and labels: sentence case only (e.g. "Reading list", "Work with me", "My approach")
- Proper nouns are always capitalised (Anna Wallace, A Normal Family, Eritage, ICF, Lisbon)
- No title case

## Content rules

- Em dashes (—) are banned. Do not introduce them in any copy, alt text, button labels, or metadata.
- Hyphens (-) in compound words are fine.

## Layout and design principles

- **No gaping white space.** Every section must feel intentional and complete. If a column or section has only a heading and one line of text beside a tall image, it is unfinished — bring content up to fill it.
- Split layouts (image + text column) must have enough content in the text column to visually balance the image. Move forms, contact details, CTAs or body copy into the column rather than leaving it empty.
- Font sizes must be proportionate. Do not use oversized headings to compensate for missing content.
- Editorial margins are fine; empty page real estate is not.
- Always consider how a layout reads at first scroll — the above-the-fold experience must look complete, not like a work in progress.
- Anna's brand is warm, intelligent and human. Layouts should feel considered, not templated.


---

## Image Handling Rules (added 2026-06-15)

### Portrait images in hero containers
- **Never use `fill` + `object-cover` for portrait images in short containers.** It always crops badly.
- For split two-column layouts: use natural proportions (`width`, `height`, `className="w-full h-auto"`) and `items-start` on the grid. No fill.
- For full-bleed landscape heroes only: fill + object-cover is acceptable with careful `object-position` tuning.
- `aspect-[2/3]` + `fill` is unreliable in Next.js grid columns — do not use.

### Mobile-first layout rule
- **Text content must be `order-1` on mobile.** Never put an image before copy on mobile — the user sees a full-screen photo with no context.
- Pattern: `order-1 md:order-2` on the text div, `order-2 md:order-1` on the image div.

### Image compression
- Inline chat images are NOT saved to the filesystem. Do not tell Anna to upload to Cloudinary first — ask her to save the file to the connected folder (`beach/assets`) and compress from there.
- Target: 900px wide for portrait editorial images, 1200px wide for landscape heroes, JPEG quality 85.

### Cloudinary uploads
- Never ask Anna to upload to Cloudinary in chat — she does not have programmatic access and large files will fail.
- After compressing, present the file and ask for the Cloudinary public ID once she has uploaded it.

---

## Podcast Episode Links (added 2026-06-15)

The RSS feed (`media.rss.com/a-normal-family/feed.xml`) only provides `creators.spotify.com` episode URLs — not consumer-facing episode links for any platform.

- **Spotify**: Convert `creators.spotify.com/pod/profile/*/episodes/SLUG` → `anchor.fm/[SHOW_HANDLE]/episodes/SLUG`. Show handle must be confirmed — do not guess.
- **Apple Podcasts**: Use the iTunes Search API at runtime to match episode title to Apple episode URL. This is the correct long-term solution.
- **YouTube**: No episode-level links available from RSS. Use channel search URL as best effort or remove YouTube from per-episode buttons.
- **Do not fall back silently to the show URL without telling Anna.** If episode links cannot be resolved, surface it.

