/*
 * Rock Spotter - Vercel Serverless API Handler
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This file wraps the Express backend app for Vercel serverless deployment.
 * It uses the same backend code to avoid duplication.
 */

const serverless = require('serverless-http');
const app = require('../backend/src/server');

// Export the serverless handler
module.exports = serverless(app);
