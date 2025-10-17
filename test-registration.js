// Test registration functionality
const testRegistration = async () => {
  try {
    // Import the auth module
    const { auth } = await import('./frontend/src/utils/api.js');
    
    console.log('Testing registration...');
    
    const testUser = {
      username: 'testuser',
      email: 'test@example.com', 
      password: 'password123'
    };
    
    const response = await auth.register(testUser);
    console.log('Registration successful:', response);
    
    if (response.data && response.data.token && response.data.user) {
      console.log('✅ Registration working correctly');
      console.log('Token:', response.data.token);
      console.log('User:', response.data.user);
    } else {
      console.log('❌ Registration response format issue');
      console.log('Response:', response);
    }
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
    console.error('Full error:', error);
  }
};

testRegistration();