/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * API Client - Centralized HTTP client for backend communication
 */

import axios from 'axios';
import { mockApi, isDemoMode } from './mockApi.js';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 
           (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api'),
  timeout: 15000, // Increased timeout for serverless cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API with fallback to demo mode on failure
export const auth = {
  register: async (userData) => {
    if (isDemoMode()) return mockApi.register(userData);
    try {
      return await api.post('/users/register', userData);
    } catch (error) {
      console.warn('Backend unavailable, using demo mode:', error.message);
      return mockApi.register(userData);
    }
  },
  login: async (credentials) => {
    if (isDemoMode()) return mockApi.login(credentials);
    try {
      return await api.post('/users/login', credentials);
    } catch (error) {
      console.warn('Backend unavailable, using demo mode:', error.message);
      return mockApi.login(credentials);
    }
  },
  requestMagicCode: async (phoneNumber) => {
    if (isDemoMode()) return mockApi.requestMagicCode(phoneNumber);
    try {
      const response = await api.post('/auth/request-code', { phoneNumber });
      return response;
    } catch (error) {
      console.warn('Backend unavailable, using demo mode:', error.message);
      return mockApi.requestMagicCode(phoneNumber);
    }
  },
  verifyMagicCode: async (phoneNumber, code) => {
    if (isDemoMode()) return mockApi.verifyMagicCode(phoneNumber, code);
    try {
      const response = await api.post('/auth/verify-code', { phoneNumber, code });
      return response;
    } catch (error) {
      console.warn('Backend unavailable, using demo mode:', error.message);
      return mockApi.verifyMagicCode(phoneNumber, code);
    }
  },
  getProfile: () => isDemoMode() ? Promise.resolve({ data: mockApi.mockUser }) : api.get('/users/profile'),
  updateProfile: (data) => isDemoMode() ? Promise.resolve({ data: { ...mockApi.mockUser, ...data } }) : api.put('/users/profile', data),
};

// Admin API
export const admin = {
  getAllUsers: () => isDemoMode() ? Promise.resolve({ data: { users: [] } }) : api.get('/users/admin/all'),
  updateUserRole: (userId, roleData) => isDemoMode() ? Promise.resolve({ data: { success: true } }) : api.put(`/users/admin/${userId}/role`, roleData),
};

// Rocks API
export const rocks = {
  getAll: (params = {}) => isDemoMode() ? mockApi.getRocks().then(data => ({ data })) : api.get('/rocks', { params }),
  getById: (id) => isDemoMode() ? Promise.resolve({ data: mockApi.mockRocks?.[0] }) : api.get(`/rocks/${id}`),
  create: (rockData) => isDemoMode() ? mockApi.createRock(rockData).then(data => ({ data })) : api.post('/rocks', rockData),
  update: (id, rockData) => isDemoMode() ? Promise.resolve({ data: { id, ...rockData } }) : api.put(`/rocks/${id}`, rockData),
  delete: (id) => isDemoMode() ? Promise.resolve({ data: { success: true } }) : api.delete(`/rocks/${id}`),
  like: (id) => isDemoMode() ? Promise.resolve({ data: { liked: true } }) : api.post(`/rocks/${id}/like`),
  comment: (id, comment) => isDemoMode() ? Promise.resolve({ data: { success: true } }) : api.post(`/rocks/${id}/comments`, { text: comment }),
  search: (params) => isDemoMode() ? mockApi.getRocks().then(data => ({ data })) : api.get('/rocks/search', { params }),
};

// Hunts API
export const hunts = {
  getAll: (params = {}) => isDemoMode() ? mockApi.getHunts().then(data => ({ data })) : api.get('/hunts', { params }),
  getById: (id) => isDemoMode() ? Promise.resolve({ data: mockApi.mockHunts?.[0] }) : api.get(`/hunts/${id}`),
  create: (huntData) => isDemoMode() ? Promise.resolve({ data: { id: Date.now(), ...huntData } }) : api.post('/hunts', huntData),
  join: (id) => isDemoMode() ? Promise.resolve({ data: { joined: true } }) : api.post(`/hunts/${id}/join`),
  leave: (id) => isDemoMode() ? Promise.resolve({ data: { left: true } }) : api.post(`/hunts/${id}/leave`),
  markFound: (huntId, rockId) => isDemoMode() ? Promise.resolve({ data: { found: true } }) : api.post(`/hunts/${huntId}/rocks/${rockId}/found`),
};

// Achievements API
export const achievements = {
  getAll: () => isDemoMode() ? Promise.resolve({ data: [] }) : api.get('/achievements'),
  getUserAchievements: (userId) => isDemoMode() ? Promise.resolve({ data: mockApi.mockUser.achievements }) : api.get(`/users/${userId}/achievements`),
};

// Health check
export const health = {
  check: () => isDemoMode() ? mockApi.health().then(data => ({ data })) : api.get('/health'),
};

export default api;