/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Albums Page - Personal and community rock collections
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Folder, FolderPlus, Grid, Users, Lock, Globe, ImageIcon, Calendar } from 'lucide-react'

const Albums = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('personal') // personal, community
  const [error, setError] = useState('')

  // Mock data for demonstration
  const mockAlbums = {
    personal: [
      {
        id: 1,
        title: "My Favorite Finds",
        description: "A collection of my most treasured rock discoveries",
        photoCount: 24,
        isPrivate: false,
        createdAt: "2024-12-15",
        coverPhoto: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=300&h=300&fit=crop",
        rocks: []
      },
      {
        id: 2,
        title: "Beach Hunting 2024",
        description: "Rocks and fossils found during beach expeditions",
        photoCount: 18,
        isPrivate: true,
        createdAt: "2024-11-20",
        coverPhoto: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=300&fit=crop",
        rocks: []
      },
      {
        id: 3,
        title: "Quartz Collection",
        description: "Various quartz specimens and crystals",
        photoCount: 12,
        isPrivate: false,
        createdAt: "2024-10-05",
        coverPhoto: "https://images.unsplash.com/photo-1602523030405-8645c9a309f0?w=300&h=300&fit=crop",
        rocks: []
      }
    ],
    community: [
      {
        id: 4,
        title: "North California Gems",
        description: "Community collection of gems found in Northern California",
        photoCount: 156,
        contributorCount: 23,
        isPublic: true,
        createdAt: "2024-09-15",
        createdBy: "GeoExplorer",
        coverPhoto: "https://images.unsplash.com/photo-1478266972526-6d2d9160b403?w=300&h=300&fit=crop",
        rocks: []
      },
      {
        id: 5,
        title: "Fossil Friday",
        description: "Weekly fossil discoveries shared by the community",
        photoCount: 89,
        contributorCount: 45,
        isPublic: true,
        createdAt: "2024-08-10",
        createdBy: "FossilHunter",
        coverPhoto: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
        rocks: []
      }
    ]
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlbums(mockAlbums)
      setLoading(false)
    }, 1000)
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading albums...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  const currentAlbums = albums[activeTab] || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rock Albums</h1>
          <p className="text-gray-600">Organize and share your rock collections</p>
        </div>
        <Link
          to="/albums/create"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FolderPlus className="h-4 w-4 mr-2" />
          Create Album
        </Link>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'personal'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Folder className="h-4 w-4 mr-2" />
                My Albums ({albums.personal?.length || 0})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'community'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Community Albums ({albums.community?.length || 0})
              </div>
            </button>
          </nav>
        </div>

        {/* Albums Grid */}
        <div className="p-6">
          {currentAlbums.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'personal' ? 'No albums yet' : 'No community albums'}
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'personal' 
                  ? 'Create your first album to organize your rock discoveries'
                  : 'Join community albums to share with other rock enthusiasts'
                }
              </p>
              {activeTab === 'personal' && (
                <Link
                  to="/albums/create"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Create Album
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAlbums.map((album) => (
                <Link 
                  key={album.id} 
                  to={`/albums/${album.id}`}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Cover Photo */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {album.coverPhoto ? (
                      <img 
                        src={album.coverPhoto} 
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-gray-300" />
                      </div>
                    )}
                    
                    {/* Privacy Badge */}
                    {activeTab === 'personal' && (
                      <div className="absolute top-2 right-2">
                        {album.isPrivate ? (
                          <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </div>
                        ) : (
                          <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                            <Globe className="h-3 w-3 mr-1" />
                            Public
                          </div>
                        )}
                      </div>
                    )}

                    {/* Photo Count */}
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <Grid className="h-3 w-3 mr-1" />
                      {album.photoCount} photos
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {album.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(album.createdAt)}
                      </div>
                      
                      {activeTab === 'community' && (
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {album.contributorCount} contributors
                        </div>
                      )}
                    </div>
                    
                    {activeTab === 'community' && (
                      <div className="mt-2 text-xs text-gray-500">
                        Created by {album.createdBy}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Albums