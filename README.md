# Devansh Mamoriya — Portfolio

A production-ready personal portfolio for a Java Full Stack Engineer, built with React, Vite, Tailwind CSS, and Framer Motion.

## Overview

Single-page portfolio covering Hero, About, Experience, Skills, Projects (with filtering + detail modal), Blog (placeholder articles, with filtering), a "Find Me Online" links section, and a validated Contact form. Includes light/dark/system theming, a mesh-network signature animation in the hero (a nod to the OTBR / Thread-mesh topology visualizer project), scroll-spy navigation, and a responsive mobile menu.

## Technologies

- **React 18 + Vite** — app shell and build tooling
- **Tailwind CSS** — styling, with a custom color/type token system (`tailwind.config.js`)
- **Framer Motion** — page-load, scroll-reveal, and hover animations
- **lucide-react** — icon set

No backend is included. The contact form validates on the client but does not send email until you wire it to a service (see **Contact Form** below).

## Installation

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd portfolio
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build & Preview

```bash
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── resume.pdf          # placeholder — replace with your real resume
├── src/
│   ├── components/         # one component per section/UI piece
│   ├── data/                # all editable content lives here
│   │   ├── profile.js       # name, role, bio, social links, resume path
│   │   ├── experience.js    # work history
│   │   ├── skills.js        # skill categories
│   │   ├── projects.js      # project cards + detail modal content
│   │   └── blog.js          # blog cards (placeholder articles)
│   ├── hooks/
│   │   ├── useTheme.js      # light/dark/system theme, persisted to localStorage
│   │   └── useScrollSpy.js  # highlights the active nav link on scroll
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── index.html               # SEO meta tags (title, description, OG, Twitter)
```

Content and UI are kept separate on purpose — update your information in `src/data/*.js` without touching any component.

## Customization

All personal information is centralized in **`src/data/profile.js`**:

```js
const profile = {
  name: 'Devansh Mamoriya',
  role: 'Java Full Stack Engineer',
  email: 'YOUR_EMAIL',
  resumeUrl: '/resume.pdf',
  social: {
    github: 'YOUR_GITHUB_URL',
    linkedin: 'YOUR_LINKEDIN_URL',
    leetcode: 'YOUR_LEETCODE_URL',
    geeksforgeeks: 'YOUR_GFG_URL',
    medium: 'YOUR_MEDIUM_URL',
  },
  // ...
}
```

Search the codebase for `YOUR_` to find every placeholder that needs a real value (emails, social URLs, project GitHub/demo links, employment dates).

### Adding a project

Add an entry to the array in `src/data/projects.js`:

```js
{
  id: 'unique-slug',
  name: 'Project Name',
  category: ['Java', 'Spring Boot'],   // used by the filter chips
  short: 'One-sentence summary for the card.',
  problem: '...',
  solution: '...',
  architectureNote: '...',
  features: ['...'],
  technologies: ['...'],
  github: 'YOUR_GITHUB_PROJECT_URL',
  demo: 'YOUR_LIVE_DEMO_URL',
}
```

If you introduce a new category, add it to the `FILTERS` array in `src/components/Projects.jsx`.

### Adding a blog article

Add an entry to `src/data/blog.js`. Once a post is actually published (e.g. on Medium), consider linking `Read More` straight to the external URL instead of the in-page modal.

### Adding your resume

Replace `public/resume.pdf` with your real resume, keeping the same filename — or update `resumeUrl` in `src/data/profile.js` if you rename it.

### Contact form (EmailJS)

The contact form is already wired up to [EmailJS](https://www.emailjs.com/) via `@emailjs/browser` — you just need your own account and keys.

1. **Create an EmailJS account** at [dashboard.emailjs.com](https://dashboard.emailjs.com/sign-up).
2. **Add an Email Service** — *Email Services → Add New Service* → connect Gmail, Outlook, or your own SMTP. Copy the **Service ID** it gives you.
3. **Create a template** — *Email Templates → Create New Template*. Use variables matching the form's field names so they map automatically:
   ```
   From: {{name}} <{{email}}>
   Subject: {{subject}}

   {{message}}
   ```
   Copy the **Template ID**.
4. **Get your Public Key** — *Account → General* → copy the **Public Key**.
5. **Add the keys to a `.env` file** in the project root (copy `.env.example`):
   ```bash
   cp .env.example .env
   ```
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```
   `.env` is gitignored — your keys stay local and are only baked into the build at build time via Vite's `import.meta.env`.
6. **Restart the dev server** (`npm run dev`) so Vite picks up the new env vars.
7. Submit the form — you should see the email land in the inbox you connected in step 2.

**On Vercel / Netlify:** add the same three variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`) in your project's environment variable settings before deploying, or the deployed form will show a "not configured" message instead of sending.

**Note on security:** EmailJS's public key is meant to be exposed client-side — that's how the free tier works. To avoid spam/abuse, enable **reCAPTCHA** or **domain allowlisting** in your EmailJS template settings once you're live.

If you'd rather use a different provider, swap out the `emailjs.sendForm(...)` call inside `handleSubmit` in `src/components/Contact.jsx` for [Formspree](https://formspree.io/), [Web3Forms](https://web3forms.com/), Netlify Forms, or a custom Spring Boot endpoint.

## Deployment

### Option 1 — Vercel (recommended)

1. Create a GitHub repository and push this project (see **Git Workflow** below).
2. Sign in to [vercel.com](https://vercel.com) with your GitHub account.
3. Click **Import Project** and select your repository.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**.

After the first deploy, every push to `main` triggers an automatic redeploy — no extra configuration needed.

### Option 2 — Netlify

1. Push the project to GitHub.
2. In [Netlify](https://netlify.com), click **Add new site → Import an existing project** and connect the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

### Option 3 — GitHub Pages

1. In `vite.config.js`, set `base: '/your-repo-name/'` (matches your GitHub repo name).
2. Build: `npm run build`
3. Deploy the `dist/` folder to the `gh-pages` branch, e.g. using the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   npx gh-pages -d dist
   ```
4. Enable GitHub Pages in the repo settings, pointing at the `gh-pages` branch.

**Recommendation:** GitHub + Vercel is the simplest path — free hosting, automatic HTTPS, and automatic redeploys on every push.

## Domain

Vercel/Netlify/GitHub Pages all give you a free subdomain (e.g. `your-project.vercel.app`) out of the box. A custom domain like `devanshmamoriya.com` is **not free** — you'd register it through a registrar (Namecheap, Google Domains successor, etc.) and then point it at your host. Free hosting and a paid custom domain are two separate things; you can deploy for free indefinitely and add the domain later.

## Git Workflow

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Once pushed, connect the repo to Vercel or Netlify for automatic deployment on every future push.

## Accessibility & Performance Notes

- Respects `prefers-reduced-motion` (disables the hero mesh animation and shortens transitions).
- Full keyboard navigation with visible focus states.
- Semantic landmarks and heading hierarchy (`h1` in the hero, `h2` per section).
- Theme is applied before first paint (inline script in `index.html`) to avoid a flash of the wrong theme.
- Fonts load via `preconnect` + `display=swap`.

## What's Left for You to Fill In

- Real email / phone in `src/data/profile.js`
- Real GitHub / LinkedIn / LeetCode / GeeksforGeeks / Medium URLs
- Real GitHub + live demo links per project in `src/data/projects.js`
- Employment start date and location in `src/data/experience.js`
- Your actual resume at `public/resume.pdf`
- A contact form backend (see **Contact Form** above)
- Real blog posts, if/when you publish them
