const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const rockRoutes = require('./routes/rockRoutes');
const huntRoutes = require('./routes/huntRoutes');
const achievementRoutes = require('./routes/achievementRoutes');

app.use('/api/users', userRoutes);
app.use('/api/rocks', rockRoutes);
app.use('/api/hunts', huntRoutes);
app.use('/api/achievements', achievementRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthInfo = {
    status: 'ok',
    message: 'Rock Spotter API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };
  res.json(healthInfo);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Rock Spotter API! 🪨',
    version: '1.0.0',
    documentation: '/api/health for status',
    endpoints: {
      users: '/api/users',
      rocks: '/api/rocks',
      hunts: '/api/hunts',
      achievements: '/api/achievements'
    }
  });
});

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rock-spotter';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Rock Spotter API server running on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = app;
