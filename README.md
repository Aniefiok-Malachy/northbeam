# Northbeam

Northbeam is a modern full-stack fintech platform inspired by premium digital banking experiences. It combines a beautiful Next.js frontend with a secure NestJS backend, providing authentication, account management, transaction tracking, and a scalable architecture suitable for production deployments.

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend
- NestJS
- Prisma ORM
- MongoDB Atlas
- JWT Authentication
- Passport.js
- Swagger
- Redis

## Features

- User Authentication
- JWT Access & Refresh Tokens
- Secure Password Hashing
- Account Management
- Transaction Tracking
- Responsive Dashboard
- Dark / Light Theme
- REST API
- API Documentation
- Modern UI Animations

## Project Structure

apps/
├── api/
└── web/

## Getting Started

### Install dependencies

```bash
npm install
```

### Backend

```bash
cd apps/api
npm install
npm run start:dev
```

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

## Environment Variables

Backend requires:

```
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
REDIS_URL=
```

Frontend requires:

```
NEXT_PUBLIC_API_URL=
```

## License

MIT