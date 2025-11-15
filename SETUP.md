# Quick Setup Guide

## Setting up your OMDb API Key

### Step 1: Get your API Key

1. Visit [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Fill out the form to request a free API key
3. Check your email for the API key
4. Copy your API key (it looks like: `421ed2b7`)

### Step 2: Create .env.local file

In the root directory of this project, create a file named `.env.local` (note the dot at the beginning).

**Windows (PowerShell):**
```powershell
New-Item -Path .env.local -ItemType File
```

**Windows (Command Prompt):**
```cmd
type nul > .env.local
```

**Mac/Linux:**
```bash
touch .env.local
```

### Step 3: Add your API key

Open `.env.local` in a text editor and add this line (replace `your_api_key_here` with your actual API key):

```
OMDB_API_KEY=your_api_key_here
```

**Example:**
```
OMDB_API_KEY=421ed2b7
```

### Step 4: Restart the development server

1. Stop the current server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

The app should now load movies successfully!

## Troubleshooting

- **Still seeing errors?** Make sure:
  - The `.env.local` file is in the root directory (same level as `package.json`)
  - There are no spaces around the `=` sign
  - You've restarted the dev server after creating the file
  - Your API key is correct (you can test it at [OMDb API](http://www.omdbapi.com/))

- **File not found?** Make sure the file is named exactly `.env.local` (with the dot at the beginning, no extension)

