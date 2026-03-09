# Dairy Milk Official Website

A luxury chocolate brand website for Dairy Milk featuring a visually rich, elegant, gold-themed showcase with product lines, brand storytelling, occasions/gifting, immersive scroll animations, and interactive micro-interactions.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Tailwind CSS (via CDN)
- Google Fonts (Playfair Display + Lato)
- Font Awesome (icons)

## Features

### Core Sections
- **Hero** - Full-viewport golden gradient with floating particles
- **Trust Bar** - Brand statistics (75+ years, 40+ countries, etc.)
- **Products** - 4-product showcase grid with unwrapping animation
- **Brand Story** - Split layout with parallax scroll
- **Ingredients** - Circular icon showcase on dark background
- **Golden Experience** - Dramatic 5-layer reveal section
- **Occasions** - 4 lifestyle occasion cards
- **Where to Buy** - Retailer links with hover effects
- **Product Detail Page** - Full product page with nutrition info

### Micro-interactions & Effects
- **Chocolate Unwrapping Animation** - Gold foil peels away on hover to reveal the chocolate
- **3D Tilt Cards** - Product cards tilt toward cursor with dynamic glow
- **Golden Sparkle Cursor Trail** - Sparkles and stars follow the mouse
- **Scroll Progress Bar** - Thin golden bar at the top of the page
- **Back to Top Button** - Floating gold button with pulse animation
- **Scroll Reveal Animations** - Fade-in/slide effects via Intersection Observer
- **Parallax Scrolling** - Depth effect on brand story image
- **Floating Particles** - 30 animated golden particles in hero
- **Enhanced Hover States** - Golden glow, scale, and slide effects throughout

### Accessibility
- Semantic HTML5 with ARIA labels
- `prefers-reduced-motion` support (disables animations)
- Keyboard navigation (ESC to close mobile menu)
- Focus-visible states

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in a web browser. No build step required.

### Option 2: Docker
```bash
# Build and run with Docker
docker build -t dairy-milk-site .
docker run -p 8080:80 dairy-milk-site
```
Then visit [http://localhost:8080](http://localhost:8080)

### Option 3: Docker Compose
```bash
docker compose up
```
Then visit [http://localhost:8080](http://localhost:8080)

To run in the background:
```bash
docker compose up -d
```

To stop:
```bash
docker compose down
```

## Docker Details

- **Base image:** `nginx:1.25-alpine` (~40MB)
- **Port:** 8080 (host) → 80 (container)
- **Non-root:** Runs as `nginx` user for security
- **Health check:** Auto-monitors container health every 30s
- **Gzip:** Enabled for CSS, JS, SVG, and other text assets
- **Caching:** Static assets cached 1 year; HTML served fresh

## Structure

```
index.html          - Main homepage
product.html        - Product detail page (Dairy Milk Classic)
css/styles.css      - Custom luxury gold theme + animations
js/main.js          - All interactions and micro-interactions
images/             - Placeholder directory for product images
Dockerfile          - Docker image definition (nginx:alpine)
docker-compose.yml  - Docker Compose service definition
nginx/default.conf  - Custom Nginx server configuration
.dockerignore       - Files excluded from Docker build context
```
