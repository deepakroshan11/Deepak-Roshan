# Deepak Roshan — Portfolio

Personal site and resume, built with **Next.js**, **[shadcn/ui](https://ui.shadcn.com/)**, **[Magic UI](https://magicui.design/)**, and **Tailwind CSS**. Content and links live in one place so updates stay simple.

**Repository:** [github.com/deepakroshan11/Deepak-Roshan](https://github.com/deepakroshan11/Deepak-Roshan)

## Features

- Single source of truth for copy, work, education, projects, and hackathons — edit [`src/data/resume.tsx`](./src/data/resume.tsx)
- **Works** index at [`/works`](./src/app/works/page.tsx) (blog-style list) with a detail page per project
- Light / dark theme, responsive layout, accessible patterns
- Animations with Motion (Framer Motion API)

## Tech stack

- Next.js 16, React, TypeScript
- Tailwind CSS v4, shadcn/ui, Magic UI
- ESLint

## Run locally

```bash
git clone https://github.com/deepakroshan11/Deepak-Roshan.git
cd Deepak-Roshan
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).  
You can use **pnpm** instead if you prefer (`pnpm install` / `pnpm dev`).

## Customize

1. Update **[`src/data/resume.tsx`](./src/data/resume.tsx)** — name, bio, socials, work, education, skills, **projects** (also drives `/works`), hackathons, navbar.
2. Replace assets under **`public/`** (avatar, logos, `resume.pdf`).
3. Old **`/blog`** URLs redirect to **`/works`**.

## Build

```bash
npm run build
npm start
```

## License

[MIT](./LICENSE) — Copyright (c) Deepak Roshan.
