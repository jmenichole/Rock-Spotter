/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Hunts Page - Rock hunting events and community activities
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Trophy, Plus, Clock } from 'lucide-react'
import { hunts } from '../utils/api'

const Hunts = () => {
  const [huntList, setHuntList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadHunts()
  }, [])

  const loadHunts = async () => {
    try {
      setLoading(true)
      const response = await hunts.getAll()
      setHuntList(response.data.hunts || [])
    } catch (error) {
      setError('Failed to load hunts. Please try again.')
      console.error('Error loading hunts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    }
    return colors[difficulty] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getHuntStatus = (hunt) => {
    const now = new Date()
    const startDate = new Date(hunt.startDate)
    const endDate = new Date(hunt.endDate)

    if (now < startDate) return { status: 'upcoming', label: 'Upcoming', color: 'bg-blue-100 text-blue-800' }
    if (now > endDate) return { status: 'ended', label: 'Ended', color: 'bg-gray-100 text-gray-800' }
    return { status: 'active', label: 'Active', color: 'bg-green-100 text-green-800' }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading hunts...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rock Hunts</h1>
          <p className="text-gray-600">Join exciting iSpy-style geological adventures</p>
        </div>
        {/* Future: Add Create Hunt button for hunt creators */}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Hunt Cards */}
      {huntList.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Trophy className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hunts available</h3>
          <p className="text-gray-600 mb-6">
            Check back soon for exciting rock hunting adventures!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {huntList.map((hunt) => {
            const huntStatus = getHuntStatus(hunt)
            
            return (
              <div key={hunt._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{hunt.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${huntStatus.color}`}>
                      {huntStatus.label}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{hunt.description}</p>

                  {/* Hunt Details */}
                  <div className="space-y-2 mb-4">
                    {/* Difficulty */}
                    <div className="flex items-center text-sm">
                      <Trophy className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-700 mr-2">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(hunt.difficulty)}`}>
                        {hunt.difficulty?.charAt(0).toUpperCase() + hunt.difficulty?.slice(1)}
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{formatDate(hunt.startDate)} - {formatDate(hunt.endDate)}</span>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{hunt.participants?.length || 0} participants</span>
                    </div>

                    {/* Rocks Count */}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{hunt.rocks?.length || 0} rocks to find</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-gray-100">
                    {huntStatus.status === 'ended' ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed"
                      >
                        Hunt Ended
                      </button>
                    ) : huntStatus.status === 'upcoming' ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-md cursor-not-allowed"
                      >
                        <Clock className="h-4 w-4 inline mr-2" />
                        Starts {formatDate(hunt.startDate)}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // TODO: Implement join hunt functionality
                          console.log('Join hunt:', hunt._id)
                        }}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Join Hunt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">How Rock Hunts Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            <strong>1. Join a Hunt</strong>
            <p>Browse available hunts and join ones that interest you</p>
          </div>
          <div>
            <strong>2. Find Rocks</strong>
            <p>Use clues and hints to discover rocks in the real world</p>
          </div>
          <div>
            <strong>3. Earn Achievements</strong>
            <p>Complete hunts to earn badges and build your reputation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hunts