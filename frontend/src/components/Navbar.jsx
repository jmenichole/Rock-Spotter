/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Navigation Component - Main app navigation with social feed emphasis
 */

import { Link } from 'react-router-dom'
import { Mountain, User, LogOut, Camera, Map, Trophy, Heart, MessageCircle, Folder } from 'lucide-react'

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-800">Rock Spotter</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/feed" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  <Heart className="h-4 w-4" />
                  <span>Feed</span>
                </Link>
                <Link 
                  to="/gallery" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Gallery</span>
                </Link>
                <Link 
                  to="/hunts" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Map className="h-4 w-4" />
                  <span>Hunts</span>
                </Link>
                <Link 
                  to="/albums" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Folder className="h-4 w-4" />
                  <span>Albums</span>
                </Link>
                <Link 
                  to="/create" 
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Add Post
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user?.username}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu button - can be expanded later */}
      <div className="md:hidden px-4 pb-2">
        {isAuthenticated && (
          <div className="flex space-x-4">
            <Link 
              to="/feed" 
              className="text-sm text-blue-600 font-medium"
            >
              Feed
            </Link>
            <Link 
              to="/gallery" 
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Gallery
            </Link>
            <Link 
              to="/hunts" 
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Hunts
            </Link>
            <Link 
              to="/create" 
              className="text-sm text-primary-600 font-medium"
            >
              Add Post
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar