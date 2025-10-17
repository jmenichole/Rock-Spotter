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
        {/* API Status Indicator */}
        <div className={`w-full text-center py-1 text-sm ${
          isDemoMode() ? 'bg-blue-100 text-blue-800' :
          apiStatus === 'connected' ? 'bg-green-100 text-green-800' :
          apiStatus === 'disconnected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {isDemoMode() ? '🎭 Demo Mode - Using Mock Data' :
           apiStatus === 'connected' ? '🟢 API Connected' :
           apiStatus === 'disconnected' ? '🔴 API Disconnected - Check if backend is running' :
           '🟡 Checking API...'}
        </div>

        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={logout} 
        />
        
        <main className="container mx-auto px-4 py-8">
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
