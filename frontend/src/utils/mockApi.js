/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

/*
 * Mock API for GitHub Pages Demo
 * Provides sample data when backend is not available
 */

// Mock data
const mockRocks = [
  {
    id: '1',
    title: 'Beautiful Quartz Crystal',
    description: 'Found this amazing clear quartz crystal during a hike in the mountains. The clarity and formation are absolutely stunning!',
    imageUrl: 'https://images.unsplash.com/photo-1518281420975-50db6e5d0a97?w=500',
    location: 'Rocky Mountain National Park, CO',
    rockType: 'mineral',
    user: { username: 'RockHunter22', id: 'user1' },
    likes: 24,
    comments: [
      { user: 'GeologyExpert', comment: 'Excellent specimen! Nice clarity.' },
      { user: 'CrystalLover', comment: 'Where exactly did you find this?' }
    ],
    createdAt: new Date('2024-10-15').toISOString()
  },
  {
    id: '2',
    title: 'Sedimentary Layer Sample',
    description: 'Interesting sedimentary rock showing distinct layering from different geological periods.',
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500',
    location: 'Grand Canyon, AZ',
    rockType: 'sedimentary',
    user: { username: 'StratigraphyFan', id: 'user2' },
    likes: 18,
    comments: [],
    createdAt: new Date('2024-10-14').toISOString()
  },
  {
    id: '3',
    title: 'Metamorphic Gneiss',
    description: 'Beautiful banded gneiss showing foliation patterns typical of high-grade metamorphism.',
    imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=500',
    location: 'Adirondack Mountains, NY',
    rockType: 'metamorphic',
    user: { username: 'MetamorphicMike', id: 'user3' },
    likes: 31,
    comments: [
      { user: 'RockHunter22', comment: 'Love the banding patterns!' }
    ],
    createdAt: new Date('2024-10-13').toISOString()
  }
]

const mockHunts = [
  {
    id: '1',
    title: 'Desert Mineral Hunt',
    description: 'Join us for a guided mineral hunting expedition in the Mojave Desert. Perfect for beginners!',
    location: 'Mojave Desert, CA',
    date: '2024-11-15',
    difficulty: 'Beginner',
    participants: 8,
    maxParticipants: 15,
    organizer: 'DesertExplorer'
  },
  {
    id: '2',
    title: 'Fossil Discovery Weekend',
    description: 'Two-day fossil hunting adventure in famous fossil beds. Bring your own tools!',
    location: 'Dinosaur National Monument, UT',
    date: '2024-11-22',
    difficulty: 'Intermediate',
    participants: 12,
    maxParticipants: 20,
    organizer: 'FossilFinder'
  }
]

const mockUser = {
  id: 'demo-user',
  username: 'DemoUser',
  email: 'demo@rockspotter.com',
  rocksShared: 5,
  huntsCompleted: 3,
  achievements: ['First Rock', 'Hunter', 'Community Member']
}

// Mock API responses
export const mockApi = {
  // Auth endpoints
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
    return {
      token: 'demo-token-' + Date.now(),
      user: mockUser
    }
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      token: 'demo-token-' + Date.now(),
      user: { ...mockUser, username: userData.username, email: userData.email }
    }
  },

  // Rocks endpoints
  getRocks: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockRocks
  },

  createRock: async (rockData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newRock = {
      id: Date.now().toString(),
      ...rockData,
      user: mockUser,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    }
    mockRocks.unshift(newRock)
    return newRock
  },

  // Hunts endpoints
  getHunts: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockHunts
  },

  // Health check
  health: async () => {
    return {
      status: 'ok',
      message: 'Rock Spotter Demo API (Mock Data)',
      environment: 'demo'
    }
  }
}

// Check if we're in demo mode
export const isDemoMode = () => {
  return window.location.hostname.includes('github.io') || 
         window.location.hostname === 'localhost' && !window.location.port
}