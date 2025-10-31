/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

/*
 * MongoDB Connection Test for Rock Spotter
 * Run this script to test your MongoDB Atlas connection
 */

const mongoose = require('mongoose');
require('dotenv').config();

// Test connection
async function testConnection() {
  try {
    console.log('🔗 Testing MongoDB connection...');
    
    // Use environment variable or fallback
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://rockspotter:YOUR_PASSWORD@cluster0.0z3jtr.mongodb.net/rock-spotter?retryWrites=true&w=majority&appName=Cluster0";
    
    console.log('📍 Connecting to:', mongoURI.replace(/:([^:@]+)@/, ':***@')); // Hide password in logs
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Connection state:', mongoose.connection.readyState);
    console.log('🏷️  Database name:', mongoose.connection.name);
    
    // Test basic operation
    const testCollection = mongoose.connection.db.collection('connection_test');
    await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Rock Spotter connection test successful!' 
    });
    
    const testDoc = await testCollection.findOne({ test: true });
    console.log('📝 Test document created:', testDoc ? '✅ Success' : '❌ Failed');
    
    // Clean up test document
    await testCollection.deleteOne({ test: true });
    
    console.log('🎉 All tests passed! Your MongoDB Atlas connection is working.');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication')) {
      console.error('\n💡 Suggestion: Check your username and password');
      console.error('   - Username: rockspotter');
      console.error('   - Password: Make sure it\'s correctly set in MONGODB_URI');
    }
    
    if (error.message.includes('network')) {
      console.error('\n💡 Suggestion: Check Network Access in MongoDB Atlas');
      console.error('   - Allow access from 0.0.0.0/0 for Vercel');
    }
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    process.exit(0);
  }
}

// Run the test
testConnection();