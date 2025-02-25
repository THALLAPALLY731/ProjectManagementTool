import axios from 'axios';

/**
 * Test the signup API integration
 * @param {Object} userData - User data containing fullName, email, and password
 * @returns {Object} Result object with success flag and data/error
 */
const testSignupIntegration = async (userData) => {
  try {
    console.log('Testing signup with:', userData);
    const response = await axios.post('/api/auth/signup', userData);
    console.log('Signup successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Signup failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Test the signin API integration
 * @param {Object} credentials - Object containing email and password
 * @returns {Object} Result object with success flag and data/error
 */
const testSigninIntegration = async (credentials) => {
  try {
    console.log('Testing signin with:', credentials);
    const response = await axios.post('/api/auth/signin', credentials);
    console.log('Signin successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Signin failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Test the authentication token validation
 * @param {string} token - JWT token to validate
 * @returns {Object} Result object with success flag and data/error
 */
const testTokenValidation = async (token) => {
  try {
    console.log('Testing token validation');
    const response = await axios.get('/api/auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Token validation successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Token validation failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Run a complete test suite for auth integration
 */
const runAuthTests = async () => {
  console.log('Starting authentication integration tests...');
  
  // Test user details
  const testUser = {
    fullName: 'Test User',
    email: `test.user.${Date.now()}@example.com`, // Using timestamp to avoid duplicate emails
    password: 'Password123!'
  };
  
  // 1. Test signup
  console.log('\n--- SIGNUP TEST ---');
  const signupResult = await testSignupIntegration(testUser);
  
  if (signupResult.success) {
    const { token } = signupResult.data;
    
    // 2. Test token validation if signup was successful
    if (token) {
      console.log('\n--- TOKEN VALIDATION TEST ---');
      await testTokenValidation(token);
    }
    
    // 3. Test signin with correct credentials
    console.log('\n--- SIGNIN TEST (VALID CREDENTIALS) ---');
    await testSigninIntegration({
      email: testUser.email,
      password: testUser.password
    });
  }
  
  // 4. Test signin with invalid credentials
  console.log('\n--- SIGNIN TEST (INVALID CREDENTIALS) ---');
  await testSigninIntegration({
    email: testUser.email,
    password: 'wrongpassword'
  });
  
  console.log('\nAuth integration tests completed.');
};

// Run the tests only in development environment
if (process.env.NODE_ENV === 'development') {
  // You can call this function manually or uncomment the line below to run tests automatically
  // runAuthTests();
  console.log('Auth integration tests available.');
}

export { 
  testSignupIntegration,
  testSigninIntegration,
  testTokenValidation,
  runAuthTests
};