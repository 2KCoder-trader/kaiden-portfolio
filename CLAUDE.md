# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint over the repo (flat config in `eslint.config.js`)

No test runner is configured.

## Architecture

This is the **Data Flex Lab** portfolio site: a Vite + React 19 SPA that hosts a landing page plus per-project landing pages, all client-side routed.

Project pages are **data-driven**. Each project is described by a JSON manifest under `src/data/projects/<slug>.json`. `src/data/projects.js` auto-discovers those files via `import.meta.glob('./projects/[!_]*.json', { eager: true })` (the `[!_]` skips `_template.json` and any other underscore-prefixed file), sorts by an optional `order` field, and exports the array. Both the homepage card grid (`src/App.jsx`) and the per-slug routes (`src/main.jsx`) are generated from this array, and the "Live Projects" stat is `projects.length`.

The shared renderer is `src/components/ProjectPage.jsx` (+ `ProjectPage.css`, all classes use the `pp-` prefix). It composes `Nav → Hero → Demo → HowItWorks → Tech → Footer` from the manifest fields. `Demo` renders a screenshot gallery from `demo.screenshots[]` (objects with `src`, optional `alt`, optional `caption`); when the array is empty it falls back to a placeholder card. Inline backticks in any text field render as `<code>` via a tiny `renderInline` helper — useful for filenames, API paths, and constants.

**To add a new project:** copy `src/data/projects/_template.json` to `src/data/projects/<slug>.json`, fill in the fields, and drop screenshot files into `public/screenshots/<slug>/` (referenced from the JSON as absolute paths like `/screenshots/<slug>/01-home.png`). The homepage card and the `/<slug>` route are generated automatically — no JSX edits required. Only touch `ProjectPage.jsx` / `ProjectPage.css` if you need a new *type* of section.

`src/pages/TrailStopApp.{jsx,css}` and `src/pages/AwsStudy.{jsx,css}` are the pre-refactor hand-coded pages, kept on disk as an unwired fallback. They are not imported and will drift; treat them as a short-term safety net, not a parallel implementation.

Static assets that need a stable URL (e.g. `public/aws-study-demo.mp4`, `public/favicon.svg`) live in `public/` and are referenced by absolute path. Bundled assets live in `src/assets/`.

The repo describes external apps (Trailing Stop App, AWS SAA-C03 Quiz); their source lives in separate repos. Landing-page copy should stay accurate to those upstream apps — see commits like `19762ab` for the convention of syncing copy from the source repo.
