# Parliament Member Citizen Portal

A modern, professional web application for parliament members to manage citizen services and complaints. Built with Next.js, TypeScript, TailwindCSS, and Supabase.

## Features

### Public Features
- **Modern Landing Page** with hero section and statistics
- **About Page** with member biography, vision, and achievements
- **Phone OTP Authentication** via Supabase Auth
- **Service Categories** for different complaint types
- **Dynamic Complaint Forms** that adapt based on category
- **Complaint Tracking** with unique tracking codes
- **Responsive Design** optimized for mobile and desktop

### User Features (Authenticated)
- Submit complaints across 6 categories
- Track complaint status in real-time
- View complaint history
- Receive tracking codes for all submissions

### Admin Features (Protected)
- View all complaints in a centralized dashboard
- Filter by status and category
- Update complaint status
- Add admin notes and responses
- Export complaints to CSV
- Statistics overview

## Tech Stack

- **Frontend:** Next.js 15+ (App Router), TypeScript, React 19
- **Styling:** TailwindCSS with custom design system
- **Backend:** Supabase (Auth, Database, Storage)
- **Authentication:** Phone OTP via Supabase Auth
- **Database:** PostgreSQL with Row Level Security (RLS)

## Design System

### Colors
- Navy Blue: `#0A1A2F` (primary)
- White: `#FFFFFF` (background)
- Gold: `#C7A14A` (accent)

### Typography
- System fonts for optimal performance and readability

## Project Structure

```
parliament-portal/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx              # Home page with hero
│   │   ├── about/page.tsx        # About member
│   │   ├── services/page.tsx     # Service categories
│   │   ├── track/page.tsx        # Complaint tracking
│   │   └── admin/page.tsx        # Admin dashboard
│   ├── auth/
│   │   ├── login/page.tsx        # Phone OTP login
│   │   └── verify/page.tsx       # OTP verification
│   ├── complaints/
│   │   ├── new/page.tsx          # Dynamic complaint form
│   │   └── success/page.tsx      # Submission success
│   ├── api/
│   │   └── auth/callback/        # Auth callback
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   └── layout/
│       ├── Header.tsx            # Navigation header
│       └── Footer.tsx            # Site footer
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── database.types.ts         # TypeScript types
│   └── complaintCategories.ts   # Category definitions
├── supabase-schema.sql          # Database schema
├── middleware.ts                 # Next.js middleware
├── tailwind.config.js           # Tailwind configuration
└── package.json
```

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- A Supabase account
- Git (optional)

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy your project URL and anon key
4. Go to SQL Editor and run the contents of `supabase-schema.sql`
5. Enable Phone Auth:
   - Go to Authentication → Providers
   - Enable Phone provider
   - Configure Twilio or another SMS provider

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_EMAIL=admin@parliament.gov
```

### 5. Set Up Admin Access

After creating your first user account, run this SQL in Supabase SQL Editor:

```sql
-- Replace USER_ID with your actual user ID
INSERT INTO admins (id, email)
VALUES ('YOUR-USER-ID', 'admin@parliament.gov');
```

To get your user ID, check the `auth.users` table in Supabase.

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Database Schema

### Tables

#### `profiles`
- User profile information
- Links to auth.users

#### `complaints`
- All complaint submissions
- Includes auto-generated tracking codes
- Status tracking (pending, review, resolved, rejected)

#### `admins`
- Admin user list
- Controls access to admin dashboard

### Row Level Security (RLS)

The database implements comprehensive RLS policies:

- Users can only view/edit their own complaints
- Admins can view/edit all complaints
- Public cannot access any data without authentication

### Storage

- Bucket: `complaint-attachments`
- Organized by user ID
- RLS policies for upload and access

## Usage Guide

### For Citizens

1. **Sign In:** Use phone number to receive OTP
2. **Browse Services:** Select complaint category
3. **Submit Complaint:** Fill out dynamic form
4. **Receive Tracking Code:** Save for future reference
5. **Track Status:** Use tracking page to monitor progress

### For Admins

1. **Access Dashboard:** Navigate to `/admin`
2. **View Complaints:** See all submissions with filters
3. **Update Status:** Click "View/Edit" on any complaint
4. **Add Notes:** Provide response to citizen
5. **Export Data:** Download CSV for reporting

## Complaint Categories

1. **Public Services Complaints** - Government service issues
2. **Health & Hospitals** - Healthcare facility issues
3. **Education** - School and education issues
4. **Infrastructure & Projects** - Roads, utilities, construction
5. **Legal & Social** - Legal assistance and social welfare
6. **Economic & Financial Support** - Employment and business

## Security Features

- HTTPS-only (enforced by Next.js in production)
- Row Level Security on all database tables
- Secure authentication via Supabase
- Phone OTP for identity verification
- Admin role verification
- Protected routes via middleware
- No sensitive data exposure

## Customization

### Update Member Information

Edit the following files:
- `app/page.tsx` - Hero section
- `app/about/page.tsx` - Biography and achievements

### Modify Colors

Edit `tailwind.config.js`:

```js
colors: {
  navy: {
    DEFAULT: '#0A1A2F',  // Your color here
  },
  gold: {
    DEFAULT: '#C7A14A',  // Your color here
  },
}
```

### Add More Categories

Edit `lib/complaintCategories.ts` and add new category objects.

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure these are set in your hosting platform:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

## Production Checklist

- [ ] Update member information in all pages
- [ ] Replace placeholder images
- [ ] Configure Supabase phone auth with real SMS provider
- [ ] Set up custom domain
- [ ] Add actual contact information
- [ ] Configure HTTPS/SSL
- [ ] Test all forms and authentication flows
- [ ] Set up database backups
- [ ] Create first admin account
- [ ] Test admin dashboard functionality

## Support & Maintenance

### Common Issues

**Phone Auth Not Working:**
- Verify Twilio/SMS provider is configured in Supabase
- Check phone number format (+country code)

**Admin Dashboard Access Denied:**
- Verify user ID is in `admins` table
- Check RLS policies are active

**Tracking Code Not Found:**
- Verify complaint was successfully submitted
- Check tracking code format (e.g., C123456)

## License

This project is provided as a template for official government use.

## Credits

Built with modern web technologies:
- Next.js by Vercel
- Supabase for backend infrastructure
- TailwindCSS for styling
- TypeScript for type safety
