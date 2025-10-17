#!/bin/bash

# 🚀 Rock Spotter Deployment Helper Script
# Run this script to prepare your project for deployment

echo "🪨 Rock Spotter Deployment Setup"
echo "================================="

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend dependency installation failed"
    exit 1
fi

# Install API dependencies
echo "📦 Installing API dependencies..."
cd ../api
npm install
if [ $? -eq 0 ]; then
    echo "✅ API dependencies installed"
else
    echo "❌ API dependency installation failed"
    exit 1
fi

# Build frontend for production
echo "🔨 Building frontend for production..."
cd ../frontend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. 🗄️  Set up MongoDB Atlas (see DEPLOYMENT.md)"
echo "2. ☁️  Deploy to Vercel:"
echo "   - Fork this repository to your GitHub"
echo "   - Connect to Vercel"
echo "   - Add environment variables"
echo "3. 📱 Enable GitHub Pages for static demo"
echo ""
echo "📖 Full instructions: DEPLOYMENT.md"
echo "📧 Support: jmenichole007@outlook.com"