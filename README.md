# ⚡ EventBooking Platform

A premium, full-stack event booking and management platform built with modern web technologies. This application allows users to discover events, create their own events, RSVP to attend, and manage their schedules through a personalized dashboard.

![Event Booking Platform](https://event-booking-byt.vercel.app/images/hero.jpg) *(Note: Replace with actual screenshot)*

## ✨ Features

- **Authentication**: Secure email/password login and registration using Better Auth.
- **Event Discovery**: Browse upcoming events with details on date, time, location, and capacity.
- **Event Creation (CRUD)**: Create, edit, and delete your own events as an organizer.
- **RSVP System**: One-click RSVP with optimistic UI updates and capacity tracking (shows "Sold Out" and "Almost Full" states).
- **Personal Dashboard**: Track events you are hosting and events you are attending in one place.
- **Email Notifications**: Automated confirmation emails via Resend when you RSVP to an event.
- **Premium UI**: Stunning dark-mode glassmorphism design built with custom CSS, featuring smooth page transition animations and loading skeletons.

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: Custom CSS (Vanilla CSS with CSS Variables & Glassmorphism)
- **Database**: [PostgreSQL 16](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/))
- **ORM**: [Prisma 7](https://www.prisma.io/) (with `@prisma/adapter-pg`)
- **Authentication**: [Better Auth v1](https://better-auth.com/)
- **Validation**: [Zod v4](https://zod.dev/)
- **Email Service**: [Resend](https://resend.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- Docker (optional, for local PostgreSQL database)

### 1. Clone the repository
```bash
git clone https://github.com/TusharxSingh/Event-Booking-.git
cd Event-Booking-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add the following:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/eventbooking"

# Better Auth
BETTER_AUTH_SECRET="your-super-secret-key-at-least-32-chars-long"

# Resend (Optional - for emails)
RESEND_API_KEY="re_your_resend_api_key"
```

### 4. Setup Database
If you have Docker installed, you can spin up a local PostgreSQL instance:
```bash
docker-compose up -d
```
Then, push the Prisma schema to your database:
```bash
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ☁️ Deployment

This project is optimized for deployment on Vercel. 
Make sure you set the following environment variables in your Vercel project settings:
- `DATABASE_URL` (Points to your production Neon Postgres URL)
- `BETTER_AUTH_SECRET`
- `RESEND_API_KEY` (Ensure you have a verified custom domain on Resend for production emails)

## 📝 License
MIT License
