# Publishing Company - Internal System Demo

A demonstration application showcasing digitalization and process automation for small and medium enterprises (SMEs).

## Overview

This is a realistic demo of an internal web application for a small publishing company. It demonstrates how manual processes (spreadsheets, email coordination) can be replaced with a digital system.

## Features

### 1. Company Car Reservations
- View available company cars
- Create and manage reservations
- Prevent double-booking
- See upcoming and past reservations

### 2. Sales Performance Tracking
- **Sales Rep View**: Individual performance metrics and sales history
- **Manager View**: Team-wide performance overview
- Revenue tracking and product performance analysis
- Visual charts and KPIs

### 3. Author Payments Management
- Track outstanding author royalty payments
- Mark payments as paid/due/overdue
- Replace spreadsheet-based tracking
- Manager-only access

### 4. Business Intelligence Dashboard
- Key performance indicators (KPIs)
- Sales trends and charts
- Payment status overview
- Upcoming reservations

## Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **Data Persistence**: localStorage (demo purposes)
- **Deployment**: Netlify

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to Netlify

### Option 1: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

### Option 2: Git-based Deployment

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build settings will be auto-detected from `netlify.toml`
6. Click "Deploy"

### Option 3: Manual Deploy

1. Build the project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder

## Demo Features

### Role Switching
The application includes a role switcher in the top navigation:
- **Sales Rep**: Limited view - only sees their own sales data
- **Manager**: Full access to all features including author payments

### Data Persistence
- All data is stored in browser localStorage
- Use the "Reset Data" button to restore original demo data
- Changes persist across page refreshes

### No Authentication Required
This is a demo application. There's no login system - use the role switcher to simulate different user perspectives.

## Use Case

This demo represents the type of internal tools built for SMEs to:
- **Digitalize manual processes** (car booking replaces email/calls)
- **Automate coordination** (prevent double-bookings automatically)
- **Provide visibility** (dashboards replace spreadsheet hunting)
- **Track operational data** (payments, sales, resources)

## Target Audience

Managing Directors, COOs, and business owners of 15-50 person companies who:
- Currently use spreadsheets for internal coordination
- Want to reduce manual processes
- Need better visibility into operations
- Don't need complex enterprise software

## Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Navigation and layout
├── context/
│   └── AppContext.jsx      # State management
├── data/
│   └── mockData.js         # Demo data
├── pages/
│   ├── Dashboard.jsx       # BI Dashboard
│   ├── CarReservations.jsx # Car booking system
│   ├── Sales.jsx           # Sales performance
│   └── AuthorPayments.jsx  # Payment tracking
├── App.jsx                 # Main app component
└── main.jsx               # Entry point
```

## Notes

- This is a demonstration application, not production-ready
- Data is stored locally in the browser
- No backend server required
- Suitable for showcasing to potential clients
- Can be extended with real backend integration

## License

Demo/Educational purposes
