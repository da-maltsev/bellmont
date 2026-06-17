# AGENTS.md — Hotel Bellmont Website

This file contains project-specific instructions for AI agents and developers working on the Bellmont hotel website.

## Project Overview

Static website for **Гостиничный комплекс Бельмонт** (Bellmont Hotel), a family-style mini-hotel in Zlatoust, Russia.

- **Production URL:** https://hotel-bellmont.ru
- **Repository:** https://github.com/da-maltsev/bellmont
- **Tech Stack:** Astro 6.1.1, Tailwind CSS 4.2, TypeScript

## Important Rules

### 1. Keep `llms.txt` in sync

The site exposes an `llms.txt` file at:

```text
https://hotel-bellmont.ru/llms.txt
```

**Whenever you change site content that is reflected in `llms.txt`**, you MUST update `public/llms.txt` as well. This includes:

- Hotel description or positioning
- Address, phone numbers, email
- Services and their names/links
- Booking link
- Social media links

### 2. SEO conventions

- Every page must have a unique `title` and `description` passed to `BaseLayout`.
- Page titles should include keywords like "гостиница Златоуст", "номера", "отель Бельмонт" where natural.
- Canonical URLs and Open Graph tags are generated automatically by `BaseLayout.astro`.
- `og-image.webp` must remain at `public/images/og-image.webp` and should be 1200×630 px.
- Use `trailingSlash: 'always'` — internal links must end with `/`.
- Schema.org JSON-LD is provided via `SchemaOrg.astro` and `BreadcrumbSchema.astro`.

### 3. Images

- All photos used on the site must be in **WebP** format.
- File names should be in **English** (no transliteration), e.g., `pool.webp`, `banquet-hall.webp`.
- Room images live in `public/images/rooms/{category}/1.webp`.
- Run image optimization through the existing Python script or an equivalent tool.

### 4. Build and deploy

The project builds automatically via GitHub Actions on every push to `master`:

1. Builds the static site
2. Builds and pushes a Docker image to `ghcr.io/da-maltsev/bellmont:latest`
3. Deploys static files to GitHub Pages
4. SSH-es into the VPS, pulls the new image, and restarts the `bellmont` container

Local build commands:

```bash
npm install
npm run build       # Build for VPS
npm run preview     # Preview locally
```

Docker build:

```bash
podman build -t bellmont:local .
# or
docker build -t bellmont .
```

### 5. Deployment infrastructure

- **VPS:** Fedora 43 Cloud
- **Reverse proxy / HTTPS:** Caddy running as rootful quadlet (`/etc/containers/systemd/caddy.container`)
- **Site container:** `bellmont` running as rootless quadlet under `deploy` user
- **Auto-update:** GitHub Actions deploy job uses `podman pull` + `systemctl --user restart bellmont`

### 6. When adding new pages

- Create the page in `src/pages/`
- Add it to the sitemap automatically via `@astrojs/sitemap`
- Update `Header.astro` and `Footer.astro` navigation if needed
- Add `SchemaOrg` and `BreadcrumbSchema` components
- Update `public/llms.txt` if the page represents a service or important info

### 7. Contact and business data

Current canonical values (copy from here, do not invent):

- Address: г. Златоуст, ул. Таганайская, 194 А
- Phone: +7 (906) 862-88-66
- Secondary phone: +7 (3513) 655-700
- Email: bellmont@mail.ru
- VK: https://vk.com/bellmont.hotel
- Yandex Maps: https://yandex.ru/maps/org/belmont/1188344269/
- Booking: https://b.tlintegration.com/?hotel=13392
- Coordinates: 55.155248, 59.672412
