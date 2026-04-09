# Hotel Bellmont Website

Static website for Гостиничный комплекс Бельмонт (Zlatoust, Russia).

## Tech Stack

- **Framework:** Astro 6.1.1
- **Styling:** Tailwind CSS 4.2
- **Language:** TypeScript

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for VPS (serves at `/`) |
| `npm run build:gh-pages` | Build for GitHub Pages (serves at `/bellmont`) |
| `npm run preview` | Preview built site locally |

## Deployment

### GitHub Pages (automatic)

Push to `master` branch - GitHub Actions automatically builds and deploys to:
`https://da-maltsev.github.io/bellmont/`

### VPS with Docker

```bash
# Build for VPS (serves at root /)
npm run build

# Build Docker image
docker build -t bellmont .

# Run container
docker run -d -p 80:80 --name bellmont bellmont
```

Site will be available at `http://your-vps-ip/`

### VPS Manual (nginx)

1. Build: `npm run build`
2. Copy `dist/` contents to nginx web root (e.g., `/var/www/bellmont`)
3. Configure nginx to serve the static files

## Project Structure

```
/
├── public/          # Static assets (favicon, robots.txt)
├── src/
│   ├── components/ # Astro components
│   ├── layouts/    # Page layouts
│   ├── pages/      # Route pages
│   └── styles/     # Global CSS
├── astro.config.mjs
├── Dockerfile      # Multi-stage Docker build
└── nginx.conf      # Nginx configuration
```
