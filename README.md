# Streaming Dashboard

A modern streaming service dashboard (Netflix/Hulu clone) built with Next.js 14, TypeScript, and Tailwind CSS. This application fetches movie data from the OMDb API and displays it in a beautiful, responsive interface.

## Features

- 🎬 **Homepage** with hero banner showcasing featured movie
- 📺 **Multiple movie rows** (Popular, Now Playing, Top Rated)
- 🎯 **Movie detail pages** with comprehensive information
- 📱 **Fully responsive** design for mobile and desktop
- ⚡ **Server-side rendering** for optimal performance
- 🎨 **Modern UI** with smooth animations and transitions

## Prerequisites

- Node.js 18+ installed
- npm, pnpm, or yarn package manager
- OMDb API key (free at [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd streaming-dashboard
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
OMDB_API_KEY=your_api_key_here
```

To get your API key:
1. Visit [omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Fill out the form to request a free API key
3. Check your email for the API key
4. Copy your API key to `.env.local`

### 4. Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
streaming-dashboard/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── HeroBanner.tsx      # Hero banner component
│   │   ├── MovieCard.tsx       # Individual movie card
│   │   └── MovieRow.tsx        # Horizontal scrolling row
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx        # Dynamic movie detail page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── lib/
│   └── tmdb.ts                 # OMDb API helper functions
├── types/
│   └── movie.ts                # TypeScript interfaces
├── .env.local                  # Environment variables (not committed)
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── package.json
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Add environment variable:
   - Name: `OMDB_API_KEY`
   - Value: Your OMDb API key
5. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **OMDb API** - Open Movie Database API
- **Next.js Image** - Optimized image component

## License

This project is open source and available under the MIT License.

