# Perry Marketing Website

A modern marketing site built with [Next.js](https://nextjs.org), [Shadcn UI](https://ui.shadcn.com), and [Tailwind CSS](https://tailwindcss.com).

## Getting started

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Add Shadcn components

```bash
yarn dlx shadcn@latest add <component-name>
```

## Deploy to Vercel

This project is ready to deploy on [Vercel](https://vercel.com):

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project in the Vercel dashboard.
3. Vercel will detect Next.js automatically — no extra configuration required.
4. Set the package manager to **Yarn** if prompted.

Or deploy from the CLI:

```bash
yarn dlx vercel
```

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `yarn dev`    | Start development server |
| `yarn build`  | Create production build  |
| `yarn start`  | Run production server    |
| `yarn lint`   | Run ESLint               |
