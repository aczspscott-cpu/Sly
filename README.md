# Minimal Next.js 14 App with App Router

A lightweight Next.js 14 application using the App Router pattern with zero external dependencies beyond React and Next.js.

## File Structure

```
.
├── app/
│   ├── layout.jsx           # Root layout
│   └── page.jsx             # Home page
├── package.json             # Dependencies
├── next.config.js           # Next.js config
├── tsconfig.json            # TypeScript config
├── .eslintrc.json           # ESLint config
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Requirements Met

- ✅ Uses `/app` directory (not `pages`)
- ✅ Includes `layout.jsx` and `page.jsx`
- ✅ React functional components throughout
- ✅ Compiles without errors
- ✅ No external dependencies beyond Next.js and React

## Technology Stack

- **Next.js 14**: React framework for production
- **React 18**: UI library with hooks
- **App Router**: File-based routing in `/app` directory
- **Inline Styling**: No CSS files or utility libraries

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Key Files

### `app/layout.jsx`

- Root layout component
- Exports metadata for SEO
- Provides HTML structure with header, main, and footer
- Uses inline styles
- Renders children via `{children}` prop

### `app/page.jsx`

- Home page component
- Marked with `'use client'` for client-side interactivity
- Uses `useState` hook for a counter example
- Includes increment, decrement, and reset buttons
- All styling is inline

## Features

- ⚡ Fast development server
- 🎯 File-based routing with App Router
- 🔧 Server and Client Components
- 📝 Built-in ESLint
- 🎨 Inline styling with no external CSS
- 🚀 Optimized for production

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [App Router Guide](https://nextjs.org/docs/app)

## License

MIT
