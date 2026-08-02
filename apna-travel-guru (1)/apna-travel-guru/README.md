# Apna Travel Guru — Website

A single-page, mobile-first website for Apna Travel Guru. No database, no
admin login — all content lives in one plain file you edit directly.

---

## 1. The only file you need to edit: `js/data.js`

Everything on the site — packages, prices, WhatsApp number, call number,
social links, reviews, office hours, Google Maps — is pulled from
`js/data.js`. Open it in any text editor (Notepad, VS Code, even GitHub's
own web editor) and change the values.

| To change...                          | Edit this in `js/data.js`        |
|----------------------------------------|-----------------------------------|
| WhatsApp / call number                 | `SITE_CONFIG.whatsappNumber` / `callNumber` |
| Social links                           | `SITE_CONFIG.social`             |
| Follower/views stats                   | `SITE_CONFIG.stats`              |
| Office hours / address / map           | `SITE_CONFIG` bottom fields       |
| Package price, duration, group size    | Each object inside `PACKAGES`     |
| Package itinerary / hotel / inclusions | `tiers.standard/premium/luxury` inside each package |
| YouTube / Instagram reel links         | `youtubeReelUrl` / `instagramReelUrl` |
| Customer reviews                       | `REVIEWS` array                   |

After editing, save the file and redeploy (see below) — no other file
needs to change, and nothing needs rebuilding.

### Adding a new package
Copy one whole package block (from `{` to the matching `}`) inside the
`PACKAGES` array, paste it before the closing `]`, give it a unique `id`,
and edit the fields. It will automatically appear as a new card with its
own modal, tiers, and pricing.

### Removing a package
Delete its whole `{ ... }` block, and remove the trailing comma if it's
now the last item in the list.

---

## 2. Adding real photos

Right now every image is a placeholder (a solid-color block with a label)
so the site works out of the box. Replace them with real photos using
the **exact same filenames**, so you don't have to touch any code:

```
images/hero/hero-background.jpg     → wide destination photo for the hero
images/hero/about-photo.jpg         → team / guide photo for About section
images/packages/ujjain-omkareshwar.jpg
images/packages/kutch-rann-utsav.jpg
images/packages/banaras-ayodhya.jpg
images/packages/*-yt-thumb.jpg      → YouTube reel thumbnails (6 files)
images/packages/*-ig-thumb.jpg      → Instagram reel thumbnails (6 files)
images/reviews/priya.jpg, rohit.jpg, anjali.jpg
```

Recommended: JPG format, under 300KB each, package photos ~800×600px,
hero photo ~1600×900px. Use your own YouTube/Instagram content stills —
avoid using photos you don't have rights to, since this is a live
business site.

If you add a package with a new image filename, just update the `image`
field for that package in `data.js` to match.

---

## 3. Folder structure

```
apna-travel-guru/
├── index.html                  ← main page (rarely needs editing)
├── privacy-policy.html
├── terms-and-conditions.html
├── refund-policy.html
├── cancellation-policy.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── styles.css              ← all design tokens & styling
├── js/
│   ├── data.js                 ← ✅ EDIT THIS for content updates
│   └── main.js                 ← renders the page from data.js
└── images/
    ├── hero/
    ├── packages/
    └── reviews/
```

> ⚠️ The four policy pages (`privacy-policy.html`, etc.) contain
> **draft placeholder text**. Have them reviewed before you rely on them —
> real refund/cancellation terms carry legal weight.

---

## 4. Deploying to GitHub Pages (free hosting)

1. Create a free GitHub account at [github.com](https://github.com) if
   you don't have one.
2. Create a new repository, e.g. `apna-travel-guru`.
3. Upload all files in this folder to that repository (drag-and-drop
   works on github.com, or use `git push` if you're comfortable with
   Git).
4. In the repository, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source: Deploy from a branch**,
   branch: `main`, folder: `/ (root)`. Save.
6. Wait 1–2 minutes. Your site will be live at:
   `https://<your-username>.github.io/apna-travel-guru/`

### Using your own domain (e.g. apnatravelguru.com)
1. Buy a domain from any registrar (GoDaddy, Namecheap, etc.).
2. In your domain's DNS settings, add a `CNAME` record pointing to
   `<your-username>.github.io`.
3. In GitHub → Settings → Pages → Custom domain, enter your domain and
   save. GitHub will provision free HTTPS automatically (can take up to
   24 hours).

### Making future edits live
Every time you edit `js/data.js` (or any file) and push the change to
GitHub, the live site updates automatically within a minute — no
rebuild step, no admin panel, no database.

---

## 5. Google Search Console setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add your property using the domain you deployed to.
3. Verify ownership (DNS TXT record if using a custom domain, or the
   HTML file method if using the raw `github.io` URL).
4. Once verified, go to **Sitemaps** and submit:
   `https://www.apnatravelguru.com/sitemap.xml`
5. Update the URLs inside `sitemap.xml` and the `<link rel="canonical">`
   / Open Graph tags in `index.html` to match your actual live domain
   before submitting (they're currently placeholder URLs).

---

## 6. SEO already configured

- Descriptive `<title>` and meta description targeting spiritual/cultural
  tour searches
- Open Graph tags for clean WhatsApp/Facebook/Instagram link previews
- `TravelAgency` structured data (JSON-LD) for richer Google results
- `robots.txt` + `sitemap.xml` included
- Semantic HTML headings (`h1` → `h2` → `h3`) throughout
- Fast-loading: no frameworks, no build step, minimal external requests

To improve rankings further over time: publish blog-style content about
each destination, keep Google Business Profile details consistent with
this site, and get customers to leave Google reviews.

---

## 7. Getting help with future edits

Whenever you want to change something, you can just paste the current
`js/data.js` (or any file) back into a chat and describe what you want
changed — you'll get the exact updated file to redeploy. No need to
learn to code for day-to-day updates.
