# 🚀 Rock Spotter Deployment Guide

Deploy Rock Spotter to Vercel with MongoDB Atlas for a complete full-stack solution.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier)
- MongoDB Atlas account (free tier)

## 🎯 Quick Deploy

### Option 1: One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jmenichole/Rock-Spotter)

### Option 2: Manual Setup

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free tier (M0 Sandbox - 512 MB)

2. **Create Database Cluster**
   ```bash
   # Cluster Name: rock-spotter
   # Region: Choose closest to your users
   # Tier: M0 Sandbox (Free)
   ```

3. **Configure Database Access**
   - **Database Access** → **Add New Database User**
   - Username: `rockspotter`
   - Password: Generate secure password
   - Database User Privileges: `Read and write to any database`

4. **Configure Network Access**
   - **Network Access** → **Add IP Address**
   - **Allow Access from Anywhere**: `0.0.0.0/0` (for Vercel)
   - **Comment**: "Vercel Deployment Access"

5. **Get Connection String**
   - **Database** → **Connect** → **Connect your application**
   - **Driver**: Node.js
   - **Version**: 4.1 or later
   - Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@rock-spotter.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## ☁️ Vercel Deployment

### Step 1: Fork Repository
```bash
# Fork this repository to your GitHub account
# https://github.com/jmenichole/Rock-Spotter
```

### Step 2: Connect to Vercel
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. **Import Project** → **Import Git Repository**
3. Select your forked `Rock-Spotter` repository
4. **Framework Preset**: Vite
5. **Root Directory**: Leave blank (uses root)

### Step 3: Configure Environment Variables
In Vercel project settings, add these environment variables:

```bash
# Database
MONGODB_URI=mongodb+srv://rockspotter:<password>@rock-spotter.xxxxx.mongodb.net/rock-spotter?retryWrites=true&w=majority

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Node Environment
NODE_ENV=production

# API Configuration
VITE_API_URL=/api
```

### Step 4: Deploy
- Click **Deploy**
- Vercel will automatically build and deploy your app
- Your app will be available at `https://your-project-name.vercel.app`

## 🔧 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT token signing | `your-256-bit-secret` |
| `NODE_ENV` | Environment (always `production`) | `production` |
| `VITE_API_URL` | Frontend API URL (relative for Vercel) | `/api` |

## 🛠️ Local Development

### Setup
```bash
# Clone repository
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter

# Install dependencies
cd frontend && npm install
cd ../backend && npm install
cd ../api && npm install

# Create environment files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

### Environment Configuration
**Frontend (.env.local):**
```bash
VITE_API_URL=http://localhost:3000/api
```

**Backend (.env):**
```bash
MONGODB_URI=mongodb://localhost:27017/rock-spotter
JWT_SECRET=your-development-jwt-secret
NODE_ENV=development
PORT=3000
```

### Run Development Servers
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev

# Or use Docker
docker-compose up --build
```

## 📱 GitHub Pages (Static Demo)

For a static portfolio demo without backend functionality:

1. **Enable GitHub Pages**
   - Repository **Settings** → **Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (will be created automatically)

2. **Add GitHub Actions Workflow**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: cd frontend && npm install
         - run: cd frontend && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/dist
   ```

3. **Access Demo**
   - Demo will be available at: `https://jmenichole.github.io/Rock-Spotter/`

## 🔍 Troubleshooting

### Common Issues

**❌ API Connection Failed**
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string format and credentials
- Ensure environment variables are set in Vercel

**❌ Build Failed**
- Check all dependencies are listed in `package.json`
- Verify Node.js version compatibility (18.x)
- Review build logs in Vercel dashboard

**❌ Database Connection Timeout**
- Increase connection timeout in API configuration
- Check MongoDB Atlas cluster status
- Verify network access configuration

### Support Resources

- **MongoDB Atlas Docs**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Contact Developer**: [jmenichole007@outlook.com](mailto:jmenichole007@outlook.com)

## 🎉 Success!

Your Rock Spotter application should now be running at:
- **Production**: `https://your-project-name.vercel.app`
- **API Health**: `https://your-project-name.vercel.app/api/health`

Happy rock spotting! 🪨✨