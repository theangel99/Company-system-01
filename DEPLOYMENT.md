# Deployment Guide

## Quick Start - Deploy to Netlify

### Method 1: Drag & Drop (Fastest)

1. Build the project:
```bash
npm run build
```

2. Go to https://app.netlify.com/drop

3. Drag the `dist` folder into the drop zone

4. Done! Your site is live.

### Method 2: GitHub + Netlify (Recommended for updates)

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

4. Go to https://app.netlify.com

5. Click "Add new site" → "Import an existing project"

6. Select GitHub and authorize

7. Choose your repository

8. Settings will auto-detect from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`

9. Click "Deploy site"

### Method 3: Netlify CLI

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Follow the prompts

## Environment Configuration

No environment variables needed - this is a pure frontend demo app.

## Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Features After Deployment

- Fully functional car reservation system
- Sales performance tracking with role-based views
- Author payment management
- Interactive BI dashboard
- Role switcher (no login needed)
- Data persistence in browser localStorage
- Reset demo data button

## Demo Walkthrough Script

Use this when showing to clients:

1. **Start as Manager**:
   - Show Dashboard with all KPIs
   - Navigate to Author Payments
   - Mark a payment as paid
   - Show how it updates the dashboard

2. **Switch to Sales Rep**:
   - Show Sales page (only their data visible)
   - Note limited access (no Author Payments)

3. **Car Reservations**:
   - Create a new reservation
   - Show conflict prevention (try double-booking)
   - Cancel a reservation

4. **Explain the value**:
   - "This replaces spreadsheets and email coordination"
   - "Everything is in one place"
   - "Role-based access ensures data security"
   - "Can be customized to your exact processes"

## Support

For issues with deployment, check:
- Netlify build logs
- Browser console for errors
- Ensure Node.js 18+ is used for build

## Cost

- Netlify free tier is sufficient
- No backend costs (everything runs in browser)
- No database costs (localStorage)
