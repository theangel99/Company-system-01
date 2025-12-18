# Quick Start Guide

## Immediate Setup (5 minutes)

### 1. Test Locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 2. Deploy to Netlify (Drag & Drop)

```bash
npm run build
```

Go to https://app.netlify.com/drop and drag the `dist` folder.

Done! Your demo is live.

## Demo Walkthrough Script

### For First-Time Viewers

**1. Introduction (30 seconds)**
"This is a demo of an internal system for a small publishing company. They had 15 employees coordinating everything through spreadsheets and email. Let me show you what we built..."

**2. Dashboard Overview (1 minute)**
- Point out key metrics at the top
- Show the charts
- "Everything in one place, real-time"

**3. Car Reservations (2 minutes)**
- Click "New Reservation"
- Fill in the form
- Submit
- Show it appears in the table
- Try to create a conflicting reservation
- "See? It prevents double-booking automatically"

**4. Role Switching (1 minute)**
- Click "Sales Rep" in top right
- "Notice the Author Payments menu disappeared"
- Show Sales page - "They only see their own data"
- Switch back to Manager
- "Managers see everything"

**5. Sales Performance (1 minute)**
- Show the team performance table
- Point out the charts
- "Replaces manual spreadsheet reporting"

**6. Author Payments (1 minute)**
- Show the overdue payment highlighted in red
- Click "Mark as Paid"
- "Updates immediately across all dashboards"

**7. Reset Demo (30 seconds)**
- Click "Reset Data"
- "Easy to reset for next demo"

Total time: ~7 minutes

## Key Selling Points to Emphasize

1. **"No monthly subscriptions"**
   - Unlike SaaS tools, this is a one-time build
   - Only pay minimal hosting costs

2. **"Built exactly for your workflow"**
   - Not trying to fit into a generic tool
   - Customized to how they work

3. **"Everything in one place"**
   - No switching between 5 different tools
   - Single source of truth

4. **"Easy to use, no training needed"**
   - Intuitive interface
   - Looks like a real business tool, not a toy

5. **"Can be extended infinitely"**
   - Add notifications
   - Integrate with existing systems
   - Mobile apps
   - Whatever they need

## Common Questions & Answers

**Q: "How long does this take to build?"**
A: "A system like this, 2-4 weeks depending on complexity. We start with core features and iterate."

**Q: "What about data security?"**
A: "Production systems use proper databases with encryption, backups, user authentication, and security best practices. This demo uses localStorage for simplicity."

**Q: "Can this work on mobile?"**
A: "Yes, it's responsive. We can also build native mobile apps if needed."

**Q: "What if we need changes later?"**
A: "That's the advantage of custom - we can modify anything. Unlike SaaS where you're stuck with what they offer."

**Q: "Can this integrate with our [CRM/accounting software/etc]?"**
A: "Absolutely. We can connect to virtually any system via APIs."

**Q: "What does it cost?"**
A: "It varies based on scope and complexity. I'd need to understand your specific needs, but small systems like this typically range from [YOUR RATE]."

## Customization for Different Industries

### Consulting Firm
- Replace "Cars" with "Meeting Rooms"
- Replace "Author Payments" with "Contractor Invoices"
- Add "Project Tracking"

### Manufacturing
- Replace "Cars" with "Equipment/Machinery"
- Replace "Sales" with "Production Output"
- Add "Inventory Tracking"

### Service Business
- Replace "Cars" with "Staff Scheduling"
- Replace "Sales" with "Service Bookings"
- Add "Customer Management"

### Retail
- Replace "Cars" with "Delivery Vehicles"
- Keep Sales tracking
- Add "Inventory & Supplier Management"

## Technical Details (If Asked)

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Hosting**: Netlify (free tier)
- **Backend**: None needed for demo (can add Node.js, Python, etc.)
- **Database**: localStorage for demo (would use PostgreSQL/MySQL in production)

## Next Steps After Demo

1. **If interested**:
   - "Let's schedule a follow-up to discuss your specific needs"
   - "I'll put together a custom proposal"

2. **If hesitant**:
   - "What specific processes would you want to digitalize?"
   - "What's your biggest pain point with current systems?"

3. **If comparing to SaaS**:
   - "SaaS is great for standard workflows"
   - "Custom makes sense when you have unique processes"
   - "Or when you want control and no recurring fees"

## Deployment URLs

After deploying, save your demo URLs:

- Production: `_________________`
- Backup: `_________________`
- GitHub Repo: `_________________`

## Maintenance

Update annually:
- Dates in mock data
- Dependencies (npm update)
- Add features based on client feedback

---

**Remember**: This is a conversation starter. The goal isn't to close a sale on the spot, but to:
1. Demonstrate technical capability
2. Show understanding of business processes
3. Open dialogue about their specific needs
4. Position yourself as a solutions provider, not just a coder
