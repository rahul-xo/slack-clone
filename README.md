# Slab 🟣

A team collaboration platform I built from scratch — real-time messaging, video calls, channels, DMs, the whole thing. Heavily inspired by Slack but built with a modern stack and some interesting engineering under the hood like event-driven user sync and full-stack error monitoring.

🔗 **Live:** [slack-clone-frontend-five.vercel.app](https://slack-clone-frontend-five.vercel.app)  
📁 **Repo:** [github.com/rahul-xo/Slab](https://github.com/rahul-xo/Slab)

---

## What it does

**Channels**
- Public channels — anyone in the workspace can discover and join
- Private channels — invite-only, for focused teams
- Direct messages — private 1-on-1 conversations

**Chat**
- Real-time messaging via Stream Chat
- Thread replies — keep side conversations from cluttering the main channel
- Emoji reactions on any message
- Pin important messages so they don't get buried
- File attachments — PDFs, ZIPs, and images all work
- In-chat polls with multiple answer options

**Video**
- Built-in video calls, no external app needed
- Screen sharing during calls
- Emoji reactions while on a call

**Auth & Users**
- Sign in with Google, GitHub, or Apple via Clerk
- New users are automatically synced to MongoDB in the background using Inngest webhooks
- Real-time online/offline presence for everyone in the workspace

**Reliability**
- Sentry hooked up on both frontend and backend for error tracking and performance monitoring
- TanStack Query handles server state, caching, and background refetching on the frontend

---

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS + Styled Components
- TanStack Query (React Query v5)
- Clerk (auth + user management)
- Stream Chat React + Stream Video React SDK
- Sentry (error monitoring)
- Axios

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Clerk Express (auth middleware)
- Inngest (background jobs / webhook sync)
- Stream Chat (server-side)
- Sentry Node (performance + error tracking)

**Deployment**
- Frontend → Vercel
- Backend → Also Vercel

---

## Running it locally

You'll need **Node.js**, **MongoDB**, and accounts on **Clerk**, **Stream**, **Inngest**, and **Sentry** before starting.

### 1. Clone the repo

```bash
git clone https://github.com/rahul-xo/Slab.git
cd Slab
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

SENTRY_DSN=your_sentry_dsn
```

Start the backend:

```bash
npm run test    # development (nodemon)
npm start       # production
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_STREAM_API_KEY=your_stream_api_key

VITE_SENTRY_DSN=your_sentry_dsn

VITE_BACKEND_URL=http://localhost:5001
```

Start the frontend:

```bash
npm run dev
```

App runs at `http://localhost:5173`.

---

## Project structure

```
Slab/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       ├── middleware/
│       ├── inngest/        # background job functions
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── lib/
│       └── main.jsx
```

---

## How the user sync works

When someone signs up via Clerk, a webhook fires to the backend. Inngest picks it up and runs a background function that creates the user in MongoDB. This keeps auth (Clerk) and app data (MongoDB) always in sync without blocking the main request flow.

---

## Things I want to add later

- Workspace switching (multi-tenant support)
- Message search across channels
- Notification preferences
- Mobile-friendly UI improvements

---

## Why I built this

Wanted to understand how production-grade real-time apps are actually structured — not just a basic chat tutorial but something with proper auth, background jobs, monitoring, and multiple real-time services working together. Slab was that project.

---

Built by [Rahul Bisht](https://github.com/rahul-xo)
