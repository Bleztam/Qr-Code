# Verdant Table - QR Code Menu & Admin Dashboard

A full-stack, responsive QR Code Menu and Admin Dashboard designed for local restaurants. Built with modern web technologies to ensure a fast, seamless experience for both customers and staff.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Zustand (Global State Management)
- **Backend**: Express.js (Vercel Serverless Ready), Node.js
- **Database**: Neon Serverless Postgres
- **Storage**: UploadThing for cloud image hosting

## Features
- **Customer View**: Browse menus by category, add items to a sliding cart, and place orders directly to the kitchen.
- **Admin Dashboard**: Secure `/admin` portal (Password: `admin123`) to manage menu items.
- **Live Image Uploads**: Admins can upload food photos directly to UploadThing.
- **Real-time Database**: Menu items are persisted using a serverless Postgres database.

## Local Development

### 1. Environment Variables
Create an `.env` file at the root of your project:
```env
# Neon Database Connection
DATABASE_URL="postgres://..."

# UploadThing Credentials
UPLOADTHING_TOKEN="..."
```

### 2. Start the Servers
Run the following command to concurrently start the Vite frontend (Port 3000) and the Express backend (Port 3002):
```bash
npm run dev
```

### 3. Vercel Deployment
This application is natively configured for Vercel. 
- The `vercel.json` file automatically routes API requests.
- `api/index.ts` and `api/uploadthing.ts` are processed as serverless functions.
- Ensure your `.env` variables are added to your Vercel Project Settings.
