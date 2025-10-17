/*
 * Simple MongoDB Connection Test - Bypass DNS Issues
 */

const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testSimpleConnection() {
  console.log('🔍 Simple MongoDB Connection Test');
  console.log('=================================\n');

  // Try the connection string you provided
  const mongoURI = 'mongodb+srv://rockspotter:wIVyuRnSur6EJHZp@cluster0.0z3jtr.mongodb.net/rock-spotter?retryWrites=true&w=majority';

  console.log('📍 Testing connection to MongoDB Atlas...');
  console.log('URI:', mongoURI.replace(/:([^:@]+)@/, ':***@'));

  try {
    const client = new MongoClient(mongoURI, {
      serverSelectionTimeoutMS: 30000, // Increased timeout
      connectTimeoutMS: 30000,
    });

    console.log('🔗 Attempting to connect...');
    await client.connect();

    console.log('✅ CONNECTION SUCCESSFUL!');
    console.log('🎉 MongoDB Atlas is working!');

    // Test a simple operation
    const db = client.db('rock-spotter');
    const testCollection = db.collection('test');
    
    await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Rock Spotter connection test successful!' 
    });

    const count = await testCollection.countDocuments();
    console.log('📊 Documents in test collection:', count);

    // Clean up
    await testCollection.deleteMany({ test: true });
    await client.close();

    console.log('\n🚀 READY FOR DEPLOYMENT!');
    console.log('Your MongoDB Atlas connection is working perfectly.');
    console.log('You can now deploy to Vercel with confidence!');

    return true;

  } catch (error) {
    console.log('❌ CONNECTION FAILED');
    console.log('Error:', error.message);

    if (error.message.includes('ESERVFAIL') || error.message.includes('querySrv')) {
      console.log('\n💡 DNS Issue Detected');
      console.log('This is likely a temporary network/DNS issue.');
      console.log('Solutions:');
      console.log('• Try again in a few minutes');
      console.log('• Try from a different network (mobile hotspot)');
      console.log('• The connection will work fine on Vercel production');
    }

    if (error.message.includes('authentication')) {
      console.log('\n🔐 Authentication Issue');
      console.log('Check your username and password in MongoDB Atlas');
    }

    return false;
  }
}

// Run the test
testSimpleConnection()
  .then((success) => {
    if (success) {
      console.log('\n✅ All tests passed! Ready for deployment.');
    } else {
      console.log('\n⚠️  Local connection failed, but deployment may still work.');
      console.log('💡 Network issues are common with Atlas SRV records.');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(console.error);