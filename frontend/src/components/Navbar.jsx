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
import { Mountain, User, LogOut, Camera, Map, Heart, Folder } from 'lucide-react'

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Mountain className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-800">
              <span className="hidden sm:inline">Rock Spotter</span>
              <span className="sm:hidden">Rock</span>
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
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
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  <Camera className="h-4 w-4" />
                  <span>Gallery</span>
                </Link>
                <Link 
                  to="/hunts" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  <Map className="h-4 w-4" />
                  <span>Hunts</span>
                </Link>
                <Link 
                  to="/albums" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  <Folder className="h-4 w-4" />
                  <span>Albums</span>
                </Link>
                <Link 
                  to="/create" 
                  className="bg-primary-600 text-white px-3 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium"
                >
                  Add Post
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation + User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Quick Actions */}
            {isAuthenticated && (
              <div className="flex lg:hidden items-center space-x-1 sm:space-x-2">
                <Link 
                  to="/feed" 
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  title="Feed"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link 
                  to="/create" 
                  className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  title="Add Post"
                >
                  <Camera className="h-4 w-4" />
                </Link>
              </div>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">{user?.username}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors p-2"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar