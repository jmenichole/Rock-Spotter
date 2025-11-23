# Rock Spotter - Architecture Diagram

This document provides visual representations of the Rock Spotter architecture.

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Rock Spotter Platform                         │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │                  │  │                  │  │                  │ │
│  │   Web Browser    │  │  Mobile App      │  │   Mobile Web     │ │
│  │   (React SPA)    │  │  (React Native)  │  │   (Responsive)   │ │
│  │                  │  │                  │  │                  │ │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘ │
│           │                     │                     │           │
└───────────┼─────────────────────┼─────────────────────┼───────────┘
            │                     │                     │
            └─────────────────────┼─────────────────────┘
                                  │
                          ┌───────▼───────┐
                          │               │
                          │  HTTPS/TLS    │
                          │  (Port 443)   │
                          │               │
                          └───────┬───────┘
                                  │
┌─────────────────────────────────┼─────────────────────────────────┐
│                         API GATEWAY LAYER                          │
├─────────────────────────────────┼─────────────────────────────────┤
│                                 │                                 │
│  ┌──────────────────────────────▼──────────────────────────────┐ │
│  │                                                              │ │
│  │                    Express.js API Server                     │ │
│  │                     (Node.js 22.x)                          │ │
│  │                                                              │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │ │
│  │  │  Helmet  │  │   CORS   │  │   Rate   │  │   JWT    │   │ │
│  │  │ Security │  │  Handler │  │  Limiter │  │   Auth   │   │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │ │
│  │                                                              │ │
│  └──────────────────────────┬───────────────────────────────────┘ │
│                             │                                     │
└─────────────────────────────┼─────────────────────────────────────┘
                              │
┌─────────────────────────────┼─────────────────────────────────────┐
│                      APPLICATION LAYER                             │
├─────────────────────────────┼─────────────────────────────────────┤
│                             │                                     │
│  ┌──────────────────────────▼──────────────────────────────────┐ │
│  │                        Routes Layer                          │ │
│  │                                                              │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────────┐  │ │
│  │  │  /users │  │  /rocks │  │  /hunts │  │/achievements │  │ │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └──────┬───────┘  │ │
│  └───────┼────────────┼────────────┼───────────────┼──────────┘ │
│          │            │            │               │            │
│  ┌───────▼────────────▼────────────▼───────────────▼──────────┐ │
│  │                    Controllers Layer                        │ │
│  │                                                              │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │ │
│  │  │    User     │  │    Rock     │  │    Hunt     │        │ │
│  │  │ Controller  │  │ Controller  │  │ Controller  │        │ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │ │
│  └─────────┼─────────────────┼─────────────────┼──────────────┘ │
│            │                 │                 │                │
│  ┌─────────▼─────────────────▼─────────────────▼──────────────┐ │
│  │                      Models Layer                           │ │
│  │                   (Mongoose Schemas)                        │ │
│  │                                                              │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │ │
│  │  │   User   │  │   Rock   │  │   Hunt   │  │Achievement│  │ │
│  │  │  Model   │  │  Model   │  │  Model   │  │   Model   │  │ │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬─────┘  │ │
│  └───────┼─────────────┼─────────────┼───────────────┼────────┘ │
│          │             │             │               │          │
└──────────┼─────────────┼─────────────┼───────────────┼──────────┘
           │             │             │               │
           └─────────────┼─────────────┼───────────────┘
                         │             │
┌────────────────────────┼─────────────┼───────────────────────────┐
│                    DATABASE LAYER                                 │
├────────────────────────┼─────────────┼───────────────────────────┤
│                        │             │                           │
│  ┌─────────────────────▼─────────────▼────────────────────────┐ │
│  │                                                              │ │
│  │                     MongoDB Database                         │ │
│  │                        (v7.0)                               │ │
│  │                                                              │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐           │ │
│  │  │   users    │  │   rocks    │  │   hunts    │           │ │
│  │  │ Collection │  │ Collection │  │ Collection │           │ │
│  │  └────────────┘  └────────────┘  └────────────┘           │ │
│  │                                                              │ │
│  │  ┌────────────┐  ┌──────────────────────────────┐          │ │
│  │  │achievements│  │   Indexes:                   │          │ │
│  │  │ Collection │  │   - 2dsphere (Rock location) │          │ │
│  │  └────────────┘  │   - email, username (User)   │          │ │
│  │                  └──────────────────────────────┘          │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### User Authentication Flow

```
┌────────┐                                                    ┌─────────┐
│        │  1. POST /api/users/login                         │         │
│ Client ├───────────────────────────────────────────────────►│   API   │
│        │     { email, password }                           │         │
└────────┘                                                    └────┬────┘
    ▲                                                              │
    │                                                              │
    │                                                         2. Hash
    │                                                        verification
    │                                                              │
    │                                                              ▼
    │                                                    ┌──────────────┐
    │                                                    │              │
    │                                            ┌───────►   MongoDB    │
    │                                            │       │   (users)    │
    │                                            │       │              │
    │                                            │       └──────────────┘
    │                                       3. Query              │
    │                                         user                │
    │                                                              │
    │                                                         4. User
    │                                                           found
    │                                                              │
    │                                                              ▼
    │                                                    ┌──────────────┐
    │                                                    │              │
    │                                                    │ Password OK? │
    │                                                    │              │
    │                                                    └──────┬───────┘
    │                                                           │
    │                                                      5. Yes│
    │                                                           ▼
    │                                                    ┌──────────────┐
    │                                                    │              │
    │                                            6. Generate            │
    │ 7. { token, user }                        │   JWT Token          │
    └───────────────────────────────────────────┤              │
                                                │              │
                                                └──────────────┘
```

### Rock Creation Flow

```
┌────────┐                                                    ┌─────────┐
│        │  1. POST /api/rocks                               │         │
│ Client ├───────────────────────────────────────────────────►│   API   │
│        │  Headers: { Authorization: Bearer <token> }       │         │
│        │  Body: { title, description, location, ... }      │         │
└────────┘                                                    └────┬────┘
    ▲                                                              │
    │                                                              │
    │                                                        2. Verify
    │                                                           JWT
    │                                                              │
    │                                                              ▼
    │                                                    ┌──────────────┐
    │                                                    │              │
    │                                            ┌───────►  Auth Check  │
    │                                            │       │              │
    │                                            │       └──────┬───────┘
    │                                       3. Valid            │
    │                                        token              │
    │                                                           │
    │                                                      4. Extract
    │                                                        userId
    │                                                           │
    │                                                           ▼
    │                                                    ┌──────────────┐
    │                                                    │              │
    │                                              ┌─────► Validate     │
    │                                              │     │    Input     │
    │                                              │     │              │
    │                                              │     └──────┬───────┘
    │                                         5. Valid           │
    │                                          data              │
    │                                                            │
    │                                                       6. Create
    │                                                         Rock
    │                                                            │
    │                                                            ▼
    │                                                    ┌──────────────┐
    │                                                    │              │
    │                                            7. Save │   MongoDB    │
    │                                            ┌───────►   (rocks)    │
    │                                            │       │              │
    │                                            │       └──────────────┘
    │                                       8. Saved             │
    │                                        rock                │
    │                                                            │
    │  9. { success, rock }                                     │
    └───────────────────────────────────────────────────────────┘
```

### Hunt Participation Flow

```
User                      API                    Database
 │                        │                         │
 │  POST /hunts/:id/join  │                         │
 ├───────────────────────►│                         │
 │                        │                         │
 │                        │  Find hunt by ID        │
 │                        ├────────────────────────►│
 │                        │◄────────────────────────┤
 │                        │  Hunt data              │
 │                        │                         │
 │                        │  Check capacity         │
 │                        │  & user eligibility     │
 │                        │                         │
 │                        │  Add user to            │
 │                        │  participants[]         │
 │                        ├────────────────────────►│
 │                        │◄────────────────────────┤
 │                        │  Updated hunt           │
 │                        │                         │
 │                        │  Update user            │
 │                        │  huntCount              │
 │                        ├────────────────────────►│
 │                        │◄────────────────────────┤
 │                        │  Updated user           │
 │◄───────────────────────┤                         │
 │  { success, progress } │                         │
 │                        │                         │
```

---

## Component Architecture (Frontend)

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx (Root)                        │
│                                                              │
│  ├─ Authentication State                                    │
│  ├─ Routing (React Router)                                  │
│  └─ Global Notification System                              │
│                                                              │
└──────┬───────────────────────────────────────────────────────┘
       │
       ├── Layout Components
       │   ├── Navbar.jsx (Navigation, User Menu)
       │   └── Footer.jsx (Links, Info)
       │
       ├── Page Components
       │   ├── Home.jsx (Landing Page)
       │   ├── Login.jsx / Register.jsx (Auth)
       │   ├── SocialFeed.jsx (Main Feed)
       │   ├── RockGallery.jsx (Browse Rocks)
       │   ├── CreateRock.jsx (Upload Rock)
       │   ├── Hunts.jsx (Browse/Create Hunts)
       │   ├── Profile.jsx (User Profile)
       │   └── ... (15+ more pages)
       │
       ├── Shared Components
       │   ├── AchievementSystem.jsx
       │   ├── NotificationSystem.jsx
       │   ├── UserDashboard.jsx
       │   ├── GeneralChatSystem.jsx
       │   ├── ReportSystem.jsx
       │   ├── MilestoneBadgeSystem.jsx
       │   └── ... (16 total)
       │
       └── Utilities
           ├── api.js (HTTP Client)
           └── autoModeration.js (Content Safety)
```

---

## Database Schema Relationships

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ _id             │◄─────────────────┐
│ username        │                  │
│ email           │                  │
│ password        │              references
│ profilePicture  │                  │
│ bio             │                  │
│ achievements[]  │───┐              │
│ rockCount       │   │              │
│ huntCount       │   │              │
│ role            │   │              │
│ isAdmin         │   │              │
│ isModerator     │   │              │
└─────────────────┘   │              │
                      │              │
                 references          │
                      │              │
                      ▼              │
            ┌──────────────┐         │
            │ Achievement  │         │
            ├──────────────┤         │
            │ _id          │         │
            │ name         │         │
            │ description  │         │
            │ icon         │         │
            │ type         │         │
            │ rarity       │         │
            │ criteria     │         │
            └──────────────┘         │
                                     │
┌─────────────────┐                  │
│      Rock       │                  │
├─────────────────┤                  │
│ _id             │                  │
│ title           │                  │
│ description     │                  │
│ photo           │                  │
│ location        │ (GeoJSON)        │
│ rockType        │                  │
│ tags[]          │                  │
│ user            │──────────────────┘
│ likes[]         │
│ comments[]      │
│ isPublic        │
└────────┬────────┘
         │
         │ referenced by
         │
         ▼
┌─────────────────┐
│      Hunt       │
├─────────────────┤
│ _id             │
│ title           │
│ description     │
│ difficulty      │
│ creator         │─────references───►User
│ rocks[]         │─────references───►Rock
│   ├─ rock       │
│   ├─ hint       │
│   ├─ order      │
│   └─ location   │
│ participants[]  │─────references───►User
│   ├─ user       │
│   ├─ progress   │
│   ├─ foundRocks │
│   └─ completed  │
│ startDate       │
│ endDate         │
│ isActive        │
│ maxParticipants │
└─────────────────┘
```

---

## Deployment Architecture

### Production Deployment (Vercel + MongoDB Atlas)

```
                     ┌────────────────────────┐
                     │     GitHub Repo        │
                     │   (Source Control)     │
                     └───────────┬────────────┘
                                 │
                          git push to main
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────┐
│              GitHub Actions CI/CD                          │
│                                                            │
│  ├─ Run Tests                                             │
│  ├─ Run Linters                                           │
│  ├─ Security Scan                                         │
│  └─ Build & Deploy                                        │
└────────────┬───────────────────────────┬───────────────────┘
             │                           │
    ┌────────▼────────┐         ┌────────▼────────┐
    │                 │         │                 │
    │  Vercel CDN     │         │   MongoDB       │
    │  (Frontend)     │         │   Atlas         │
    │                 │         │   (Database)    │
    │  - React SPA    │◄────────┤                 │
    │  - Edge Network │  API    │  - Managed DB   │
    │  - Auto SSL     │  Calls  │  - Backups      │
    │                 │         │  - Monitoring   │
    └────────┬────────┘         └─────────────────┘
             │
             │
    ┌────────▼────────┐
    │                 │
    │  Vercel         │
    │  Serverless     │
    │  Functions      │
    │  (API)          │
    │                 │
    │  - Auto Scale   │
    │  - Edge Runtime │
    └─────────────────┘
```

### Docker Compose Deployment (Local/VPS)

```
┌───────────────────────────────────────────────────────────┐
│                    Docker Host                            │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │           docker-compose.yml                        │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  ┌───────────────┐  ┌───────────────┐  ┌─────────────┐  │
│  │   MongoDB     │  │   Backend     │  │  Frontend   │  │
│  │  Container    │  │   Container   │  │  Container  │  │
│  │               │  │               │  │             │  │
│  │  Port: 27017  │◄─┤  Port: 3000   │◄─┤ Port: 3002  │  │
│  │               │  │               │  │  (nginx)    │  │
│  │  Volume:      │  │  Volume:      │  │             │  │
│  │  mongodb_data │  │  uploads_data │  │             │  │
│  └───────────────┘  └───────────────┘  └─────────────┘  │
│                                                           │
│  Network: rock-spotter-network (bridge)                  │
└───────────────────────────────────────────────────────────┘
                           │
                           │ Exposed Ports
                           │
                           ▼
                    ┌──────────────┐
                    │   Internet   │
                    └──────────────┘
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  React 19.1.1  │  React Router 7.0.2  │  Tailwind CSS 3.3  │
│  Vite 7.1.12   │  Axios 1.7.7         │  Lucide Icons      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  Express 4.18.2    │  JWT 9.0.2         │  CORS 2.8.5      │
│  bcryptjs 2.4.3    │  Multer 2.0.2      │  Helmet (TBD)    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  Mongoose 7.8.4    │  MongoDB 7.0       │  2dsphere Index  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  Node.js 22.x      │  Docker            │  GitHub Actions  │
│  Vercel            │  MongoDB Atlas     │  nginx           │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure Tree

```
Rock-Spotter/
│
├── backend/ (224KB)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   ├── rockController.js
│   │   │   ├── huntController.js
│   │   │   ├── achievementController.js
│   │   │   └── magicAuthController.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Rock.js
│   │   │   ├── Hunt.js
│   │   │   └── Achievement.js
│   │   │
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── rockRoutes.js
│   │   │   ├── huntRoutes.js
│   │   │   ├── achievementRoutes.js
│   │   │   └── magicAuthRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   │
│   │   └── server.js
│   │
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── frontend/ (644KB)
│   ├── src/
│   │   ├── components/ (16 files)
│   │   ├── pages/ (15+ files)
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── autoModeration.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── Dockerfile
│   └── nginx.conf
│
├── api/ (124KB) - Vercel serverless
│   ├── users/
│   ├── rocks/
│   ├── hunts/
│   ├── achievements/
│   ├── index.js
│   └── package.json
│
├── mobile-app/ (52KB) - Planned
│   ├── src/
│   │   └── theme/
│   └── README.md
│
├── docs/ (120KB)
│   ├── API.md
│   ├── DESIGN_SYSTEM.md
│   ├── HUNTS.md
│   ├── SAMPLE_DATA.md
│   ├── SETUP.md
│   └── STYLE_GUIDE.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       └── deploy-vercel.yml
│
├── scripts/
│   ├── init-mongo.js
│   └── create_admin.js
│
├── docker-compose.yml
├── vercel.json
├── package.json
└── README.md
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
└─────────────────────────────────────────────────────────────┘

Layer 1: Network Security
┌─────────────────────────────────────────────────────────────┐
│  ✓ HTTPS/TLS Encryption                                     │
│  ✓ CORS Configuration                                       │
│  ⚠ Rate Limiting (NEEDED)                                   │
│  ⚠ DDoS Protection (Platform Level)                         │
└─────────────────────────────────────────────────────────────┘

Layer 2: Application Security
┌─────────────────────────────────────────────────────────────┐
│  ✓ JWT Token Authentication                                 │
│  ✓ Password Hashing (bcrypt)                               │
│  ⚠ Security Headers (Helmet - NEEDED)                      │
│  ⚠ Input Validation (Basic - NEEDS IMPROVEMENT)            │
│  ⚠ CSRF Protection (NEEDED)                                │
└─────────────────────────────────────────────────────────────┘

Layer 3: Data Security
┌─────────────────────────────────────────────────────────────┐
│  ✓ Mongoose Schema Validation                              │
│  ✓ Password Never Returned in Responses                    │
│  ✓ MongoDB Injection Prevention (via Mongoose)             │
│  ⚠ Field-Level Encryption (OPTIONAL)                       │
│  ⚠ Data Sanitization (NEEDED)                              │
└─────────────────────────────────────────────────────────────┘

Layer 4: Access Control
┌─────────────────────────────────────────────────────────────┐
│  ✓ Role-Based Access (Admin, Moderator, User)             │
│  ✓ Protected Routes (JWT Middleware)                       │
│  ✓ Resource Ownership Validation                           │
│  ⚠ Fine-Grained Permissions (PLANNED)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Request Flow Example

### GET /api/rocks/nearby?lat=40.7&lng=-74.0&maxDistance=5000

```
1. Client Request
   ↓
2. CORS Check (middleware)
   ↓
3. Rate Limiting (TODO)
   ↓
4. JWT Verification (auth middleware)
   ↓
5. Route Handler (/api/rocks/nearby)
   ↓
6. Controller (rockController.getNearbyRocks)
   ↓
7. MongoDB Geospatial Query
   {
     location: {
       $near: {
         $geometry: { type: "Point", coordinates: [-74.0, 40.7] },
         $maxDistance: 5000
       }
     }
   }
   ↓
8. Results Returned (with pagination)
   ↓
9. JSON Response
   {
     success: true,
     rocks: [...],
     count: 42,
     page: 1,
     totalPages: 3
   }
```

---

**Last Updated:** November 23, 2025  
**Diagram Version:** 1.0  
**Status:** Complete
