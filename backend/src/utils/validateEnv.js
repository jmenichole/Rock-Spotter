/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate JWT_SECRET is strong
  if (process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }

  console.log('✅ Environment variables validated');
};

module.exports = validateEnv;
