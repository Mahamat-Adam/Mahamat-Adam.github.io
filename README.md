# mahamat-adam.github.io

My personal portfolio: about me, experience, selected projects, my final year
project, and how to get in touch.

Live at **https://mahamat-adam.github.io**

## Built with

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To produce a production build:

```bash
npm run build
npm run preview
```

## Deployment

Pushing to `main` triggers the workflow in `.github/workflows/deploy.yml`, which
builds the site and publishes it to GitHub Pages.

## Notes

The chat widget on the site is a small scripted assistant: it matches questions
against a curated set of answers in `src/data/qa.ts`. There is no external
service behind it, so the whole site stays a static build.
