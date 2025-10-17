/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

/*
 * MongoDB Atlas Connection Diagnostic Tool
 * This will help identify connection issues step by step
 */

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function diagnosticTest() {
  console.log('🔍 MongoDB Atlas Connection Diagnostics');
  console.log('=====================================\n');

  // Test 1: Check connection string format
  const mongoURI = process.env.MONGODB_URI;
  console.log('1️⃣ Connection String Check:');
  console.log('URI Format:', mongoURI ? '✅ Found' : '❌ Missing');
  
  if (mongoURI) {
    console.log('Sanitized URI:', mongoURI.replace(/:([^:@]+)@/, ':***@'));
    
    // Parse URI components
    try {
      const url = new URL(mongoURI.replace('mongodb+srv://', 'https://'));
      console.log('Host:', url.hostname);
      console.log('Username:', url.username);
      console.log('Password:', url.password ? '***' : 'Missing');
    } catch (e) {
      console.log('❌ URI parsing failed:', e.message);
    }
  }

  console.log('\n2️⃣ DNS Resolution Test:');
  
  // Test 2: Try to resolve the hostname
  try {
    const dns = require('dns').promises;
    const hostname = 'cluster0.0z3jtr.mongodb.net';
    console.log('Testing DNS resolution for:', hostname);
    
    const addresses = await dns.resolve(hostname);
    console.log('✅ DNS Resolution successful:', addresses.length, 'addresses found');
  } catch (dnsError) {
    console.log('❌ DNS Resolution failed:', dnsError.message);
    console.log('💡 This might be a network/firewall issue');
  }

  console.log('\n3️⃣ Direct MongoDB Driver Test:');
  
  // Test 3: Try with native MongoDB driver
  try {
    const client = new MongoClient(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('Connecting with native MongoDB driver...');
    await client.connect();
    
    console.log('✅ Native driver connection successful!');
    
    // Test database operation
    const db = client.db('rock-spotter');
    const collections = await db.listCollections().toArray();
    console.log('📂 Database collections:', collections.length);
    
    await client.close();
    
  } catch (nativeError) {
    console.log('❌ Native driver failed:', nativeError.message);
  }

  console.log('\n4️⃣ Mongoose Connection Test:');
  
  // Test 4: Try with mongoose
  try {
    console.log('Connecting with Mongoose...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Mongoose connection successful!');
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Database name:', mongoose.connection.name);
    
    await mongoose.connection.close();
    
  } catch (mongooseError) {
    console.log('❌ Mongoose failed:', mongooseError.message);
  }

  console.log('\n5️⃣ Alternative Connection String Test:');
  
  // Test 5: Try alternative connection string format
  const altURI = mongoURI?.replace('/?retryWrites=true&w=majority&appName=Cluster0', '/rock-spotter?retryWrites=true&w=majority');
  
  if (altURI && altURI !== mongoURI) {
    try {
      console.log('Testing alternative URI format...');
      const altClient = new MongoClient(altURI, {
        serverSelectionTimeoutMS: 10000,
      });
      
      await altClient.connect();
      console.log('✅ Alternative URI format works!');
      console.log('Recommended URI:', altURI.replace(/:([^:@]+)@/, ':***@'));
      await altClient.close();
      
    } catch (altError) {
      console.log('❌ Alternative URI also failed:', altError.message);
    }
  }

  console.log('\n📋 Diagnostic Summary:');
  console.log('===================');
  console.log('Next steps based on results above:');
  console.log('• If DNS failed: Check network/firewall settings');
  console.log('• If native driver works: Issue is with Mongoose setup');
  console.log('• If alternative URI works: Update your connection string');
  console.log('• If all fail: Check MongoDB Atlas cluster status');
}

// Run diagnostics
diagnosticTest().catch(console.error);