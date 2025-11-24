/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Test Utilities - Custom render functions and test helpers
 */

import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithRouter(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

/**
 * Mock rock data for testing
 */
export const mockRock = {
  _id: 'test-rock-1',
  title: 'Test Rock',
  description: 'A test rock for unit testing',
  rockType: 'igneous',
  location: {
    address: 'Test Location',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  likes: 10,
  reposts: 2,
  comments: [],
  createdAt: new Date('2024-01-01').toISOString(),
  userId: {
    _id: 'test-user-1',
    username: 'testuser'
  }
}

/**
 * Mock user data for testing
 */
export const mockUser = {
  _id: 'test-user-1',
  username: 'testuser',
  email: 'test@example.com',
  role: 'user',
  rockCount: 5,
  achievements: []
}

/**
 * Mock admin user for testing
 */
export const mockAdmin = {
  _id: 'test-admin-1',
  username: 'admin',
  email: 'admin@example.com',
  role: 'admin',
  rockCount: 10,
  achievements: []
}

/**
 * Wait for async operations in tests
 */
export const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms))
