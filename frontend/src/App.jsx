/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Main App Component - Handles routing, authentication, and global state
 */

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SocialFeed from './pages/SocialFeed'
import RockGallery from './pages/RockGallery'
import CreateRock from './pages/CreateRock'
import Hunts from './pages/Hunts'
import Profile from './pages/Profile'
import Albums from './pages/Albums'
import FAQ from './pages/FAQ'
import { health } from './utils/api'
import { isDemoMode } from './utils/mockApi'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState('checking')

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
    
    // Check API health
    checkApiHealth()
    setLoading(false)
  }, [])

  const checkApiHealth = async () => {
    try {
      await health.check()
      setApiStatus('connected')
    } catch (error) {
      setApiStatus('disconnected')
      console.error('API Health Check Failed:', error)
    }
  }

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Rock Spotter...</p>
        </div>
      </div>
    )
  }

  return (
    <Router basename={import.meta.env.VITE_GITHUB_PAGES === 'true' ? '/Rock-Spotter' : ''}>
      <div className="min-h-screen bg-gray-50">
        {/* API Status Indicator - Only show if not in demo mode or if there's an actual issue */}
        {(isDemoMode() || apiStatus === 'connected') && (
          <div className={`w-full text-center py-2 px-4 text-xs sm:text-sm ${
            isDemoMode() ? 'bg-blue-50 text-blue-700 border-b border-blue-200' :
            'bg-green-50 text-green-700 border-b border-green-200'
          }`}>
            <div className="container mx-auto max-w-7xl">
              {isDemoMode() ? (
                <span className="inline-flex items-center gap-1">
                  <span className="text-blue-500">🎭</span>
                  <span className="font-medium">Demo Mode</span>
                  <span className="hidden sm:inline">- Explore with sample data</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <span className="text-green-500">🟢</span>
                  <span className="font-medium">Live System</span>
                </span>
              )}
            </div>
          </div>
        )}

        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={logout} 
        />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/feed" /> : <Login onLogin={login} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? <Navigate to="/feed" /> : <Register onLogin={login} />
              } 
            />
            <Route 
              path="/feed" 
              element={
                isAuthenticated ? <SocialFeed /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/gallery" 
              element={
                isAuthenticated ? <RockGallery /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/create" 
              element={
                isAuthenticated ? <CreateRock /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/hunts" 
              element={
                isAuthenticated ? <Hunts /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? <Profile user={user} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/albums" 
              element={
                isAuthenticated ? <Albums /> : <Navigate to="/login" />
              } 
            />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
