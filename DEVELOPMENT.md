# Rock Spotter Development Guide

This guide will help you set up and develop the Rock Spotter fullstack application locally.

## 📋 Prerequisites

- **Node.js**: v20.x or higher (v22.x recommended)
- **MongoDB**: Local installation or MongoDB Atlas account
- **npm**: Comes with Node.js
- **Git**: For version control

## 🏗️ Architecture Overview

Rock Spotter is a fullstack application with three main components:

```
Rock-Spotter/
├── frontend/          # React + Vite web application
├── backend/           # Express.js API server
└── api/              # Serverless functions for Vercel deployment
```

### Frontend (React + Vite)
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend (Express.js)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for frontend communication

### API (Serverless)
- **Platform**: Vercel serverless functions
- **Purpose**: Alternative deployment for cloud hosting

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Set Up Environment Variables

#### Backend Environment

Create a `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rock-spotter

# JWT Secret (Change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# File Upload (optional)
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

#### MongoDB Setup Options

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (M0 free tier)
3. Create a database user
4. Whitelist your IP (`0.0.0.0/0` for development)
5. Get connection string and update `MONGODB_URI` in `.env`

Example Atlas URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rock-spotter?retryWrites=true&w=majority
```

### 4. Start Development Servers

You'll need **two terminal windows**:

#### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:3000`

#### Terminal 2: Frontend Dev Server
```bash
cd frontend
npm run dev
```

The web app will be available at `http://localhost:5173`

## 🐳 Docker Development (Alternative)

If you prefer using Docker:

```bash
# Start all services (MongoDB + Backend + Frontend)
docker-compose up

# Or run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Access points:
- Frontend: `http://localhost:3002`
- Backend API: `http://localhost:3000`
- MongoDB: `localhost:27017`

## 📁 Project Structure

```
Rock-Spotter/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components (routes)
│   │   ├── utils/           # Utilities (API client, helpers)
│   │   ├── assets/          # Static assets
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Public static files
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & validation
│   │   └── server.js        # Express app
│   └── package.json
│
├── api/                     # Serverless functions
│   ├── users/
│   ├── rocks/
│   ├── hunts/
│   └── achievements/
│
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
└── docker-compose.yml       # Docker configuration
```

## 🔧 Available Scripts

### Root Directory
```bash
npm run build          # Build frontend
npm run dev           # Start frontend dev server
npm run docker:up     # Start Docker services
npm run docker:down   # Stop Docker services
```

### Backend
```bash
npm start             # Start production server
npm run dev          # Start with nodemon (auto-reload)
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 🧪 Testing the Application

### 1. Test Backend API

```bash
# Health check
curl http://localhost:3000/api/health

# Should return:
# {"status":"ok","message":"Rock Spotter API is running!","version":"1.0.0",...}
```

### 2. Test Frontend

1. Open browser to `http://localhost:5173`
2. Click "Register" to create an account
3. Login with your credentials
4. Explore the features:
   - Social Feed
   - Rock Gallery
   - Create Rock Post
   - Hunts
   - Profile

## 🔐 Authentication Flow

1. **Register**: User creates account at `/register`
2. **Login**: User authenticates at `/login`
3. **JWT Token**: Backend returns JWT token
4. **Storage**: Frontend stores token in localStorage
5. **API Requests**: Token sent in Authorization header
6. **Protected Routes**: Frontend routes require authentication

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile/me` - Get current user (protected)

### Rocks
- `GET /api/rocks` - Get all rocks
- `GET /api/rocks/:id` - Get specific rock
- `POST /api/rocks` - Create rock (protected)
- `POST /api/rocks/:id/like` - Like rock (protected)

### Hunts
- `GET /api/hunts` - Get all hunts
- `POST /api/hunts` - Create hunt (protected)
- `POST /api/hunts/:id/join` - Join hunt (protected)

### Achievements
- `GET /api/achievements` - Get all achievements

See `docs/API.md` for complete API documentation.

## 🎨 Styling & Design

Rock Spotter uses a custom design system with:
- **Color Palette**: Earth tones (browns, sage greens)
- **Typography**: Inter, Merriweather, Roboto Mono
- **Framework**: Tailwind CSS
- **Icons**: Lucide React + Emoji

See `docs/DESIGN_SYSTEM.md` and `docs/STYLE_GUIDE.md` for details.

## 🐛 Debugging

### Backend Issues

```bash
# Check MongoDB connection
mongosh "mongodb://localhost:27017/rock-spotter"

# View backend logs
cd backend
npm run dev  # Watch console output
```

### Frontend Issues

```bash
# Check browser console for errors
# Open DevTools (F12) in your browser

# Clear localStorage if auth issues
localStorage.clear()
```

## 🔒 Security Best Practices

1. **Never commit `.env` files** - They're in .gitignore
2. **Change JWT_SECRET in production** - Use strong random string
3. **Use HTTPS in production** - Not HTTP
4. **Validate all inputs** - Backend validates user input
5. **Update dependencies** - Run `npm audit` regularly

## 📚 Additional Resources

- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [API Documentation](docs/API.md) - Complete API reference
- [Design System](docs/DESIGN_SYSTEM.md) - Design guidelines
- [Deployment Guide](DEPLOYMENT.md) - Production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Getting Help

- Check existing [documentation](docs/)
- Review [GitHub Issues](https://github.com/jmenichole/Rock-Spotter/issues)
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help

---

**Happy Coding! 🪨💻**
