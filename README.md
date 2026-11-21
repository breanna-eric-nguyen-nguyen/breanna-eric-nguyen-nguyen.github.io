# Breanna & Eric — Wedding Website

A science-and-love-themed (psych/bio "field study") static wedding website for Breanna & Eric, 05.31.2027, Trabuco Canyon, CA. Built with plain HTML/CSS/JS — no build step, works directly on GitHub Pages.

## Preview locally

```bash
cd "Wedding Website"
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deploy to GitHub Pages

1. Create a new GitHub repo (either `<your-username>.github.io` for a root site, or any name for a project site).
2. In this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial wedding website"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. On GitHub: Settings → Pages → Source → set to the `main` branch, root folder. Your site will publish at `https://<your-username>.github.io/<repo-name>/` (or the root domain if you used the `username.github.io` repo name).

## Things to edit before you publish

Search the project for `[EDIT` to find every placeholder, or check this list:

- **Our Story** (`index.html`, `#story` section) — the abstract and all 4 "Observation" entries (how you met, first date, a milestone, the proposal).
- **Schedule** (`#schedule`) — ceremony/cocktail hour/reception/send-off times.
- **Travel & Accommodations** (`#travel`) — hotel names/links, airport & parking notes.
- **FAQ** (`#faq`) — dress code, kids policy, plus-ones, dietary notes, parking.
- **RSVP** (`#rsvp`) — deadline date, and the form link (see below).
- **Footer** — your wedding hashtag.

The venue address (22682 Golf Club Dr, Trabuco Canyon, CA 92679) and the Google Map embed are already wired up from your Save the Date.

## Setting up the RSVP form

GitHub Pages is static (no backend), so RSVPs route through a free external form:

1. Create a [Google Form](https://forms.google.com) (or [Tally](https://tally.so) / [Formspree](https://formspree.io)) with your RSVP questions (attending y/n, guest names, meal choice, song request, etc.).
2. Grab its share link.
3. In `index.html`, find the RSVP section (`id="rsvp"`) and replace the `href="#"` on the "Open RSVP Form" button with your form's link.
4. Optional: instead of a link-out button, you can embed the form directly — Google Forms has a "Send → Embed `<>`" option that gives you an `<iframe>` you can drop into the `.rsvp-card` div.

## Photo section

The "A Few Photos" section draws from two optimized photo pools (max 1600px wide each):

- `images/engagement/` — 135 photos from the engagement shoot (`figure-01.jpg`–`figure-135.jpg`)
- `images/couple/` — 85 other couple photos (`figure-01.jpg`–`figure-85.jpg`)

On every page load, `js/main.js` shuffles both pools together and randomly picks 3 photos, shown as "Figure 1 / 2 / 3"; refresh to see a different set. Click a photo to open it full-size in a new tab.

These were auto-generated from the full-resolution originals in `engagement/Highlights/` and `pics/Highlights/` (deduplicated to one version per shot where the photographer delivered multiple edits of the same frame). Those raw folders (~2.1GB and ~1.3GB) are excluded via `.gitignore` — don't commit them, GitHub rejects files over 100MB and a multi-gigabyte repo is slow to clone. The optimized `images/engagement/` and `images/couple/` folders (~39MB + ~41MB) are what actually ship with the site.

To change how many photos show at once, edit `PHOTOS_TO_SHOW` in the `randomFigures` function in `js/main.js`. To add a third pool or more source photos later, add an entry to the `POOLS` array in that same function (folder path + photo count) after resizing the new images into a matching `images/<folder>/figure-NN.jpg` naming scheme.

## Password gate

The whole site is hidden behind a password screen. **Change the password** before publishing: open `js/main.js`, find `const PASSWORD = 'changeme';` near the top, and set it to whatever you want guests to use. Once someone enters it correctly, their browser remembers (via `localStorage`) so they won't be asked again on that device.

Important limitation: this is a static site with no backend, so there's no real way to secure it server-side. The password lives in plain text in `js/main.js`, which anyone can read via "View Page Source" — this only stops casual visitors and search engines (a `noindex` tag is also set so Google won't crawl or index the page), not a determined person. Don't put anything on this site you wouldn't want a stranger with the link to eventually see.

## Structure

```
index.html            Main page (all sections)
css/style.css          Styling — color palette, typography, layout
js/main.js             Countdown timer, mobile nav, scroll reveal, random photo figures
images/engagement/     Optimized engagement-shoot photos shown on the site
images/couple/         Optimized other-couple-photos shown on the site
engagement/            Raw camera-original engagement photos (not committed to git)
pics/                  Raw camera-original highlights photos (not committed to git)
```

## Color palette

Pulled from your Coolors board:

| Name | Hex | Used for |
|---|---|---|
| Pine Teal | `#1F4941` | Headings, nav, buttons |
| Sage Green | `#678D58` | Labels, accents, dividers |
| Pale Sky | `#C9DAEA` | Light backgrounds, highlights |
| Spicy Paprika | `#D56235` | CTAs, timeline dots |
| Crushed Berry | `#852015` | Script names, links |
