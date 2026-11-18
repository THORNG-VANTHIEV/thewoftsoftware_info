# THE WOFT website

React + TypeScript + Vite implementation of `WEBSITE_SPEC.md`.

## Run locally

```sh
npm ci
npm run dev
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys `dist/` on pushes to `main`. GitHub Pages must use **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The GitHub build uses the repository base path `/thewoftsoftware_info/`. `scripts/postbuild.mjs` generates entry pages for both project routes, a sitemap, and metadata for the GitHub Pages URL. Local builds use `/` unless `GITHUB_PAGES=true` is set.

## Content and contact

- Services, prices, and project descriptions are in `src/data.ts`.
- Project screenshots are in `public/projects/`.
- Social sharing thumbnails are `public/social-preview.png`, `public/snaca-preview.png`, and `public/lotcha-preview.png`; their editable layout is in `scripts/social-preview.html`.
- Add or update project route metadata in `scripts/postbuild.mjs` when changing the project list.
- There is no verified inquiry destination yet. The form copies a project brief. To open a populated email draft instead, set `VITE_CONTACT_EMAIL` to the confirmed business email address **before building**. The visitor must still send the draft in their email app.
- Confirm prices and service terms before treating them as binding terms.
