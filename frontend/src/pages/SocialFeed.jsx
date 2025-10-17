/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Social Feed - Main social feed showing user posts, discussions, and rock shares
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar, 
  User, 
  Camera,
  Plus,
  Filter,
  TrendingUp,
  Clock
} from 'lucide-react'
import { rocks } from '../utils/api'

const SocialFeed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('recent') // recent, popular, following
  const [showComments, setShowComments] = useState({})
  const [newComment, setNewComment] = useState({})

  useEffect(() => {
    loadFeed()
  }, [filter])

  const loadFeed = async () => {
    try {
      setLoading(true)
      const params = {
        sort: filter === 'recent' ? '-createdAt' : filter === 'popular' ? '-likes' : '-createdAt',
        limit: 20
      }
      
      const response = await rocks.getAll(params)
      setPosts(response.data.rocks || [])
    } catch (error) {
      setError('Failed to load feed. Please try again.')
      console.error('Error loading feed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId) => {
    try {
      await rocks.like(postId)
      // Update the post in the local state
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, likes: [...(post.likes || []), 'current-user'] }
          : post
      ))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleComment = async (postId) => {
    if (!newComment[postId]?.trim()) return

    try {
      await rocks.comment(postId, newComment[postId])
      // Reload the specific post or update comments
      setNewComment(prev => ({ ...prev, [postId]: '' }))
      loadFeed() // Simple approach - reload all posts
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getRockTypeColor = (type) => {
    const colors = {
      igneous: 'bg-red-100 text-red-800',
      sedimentary: 'bg-yellow-100 text-yellow-800',
      metamorphic: 'bg-purple-100 text-purple-800',
      minerals: 'bg-blue-100 text-blue-800',
      fossils: 'bg-green-100 text-green-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  if (loading && posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your feed...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rock Spotter Feed</h1>
          <p className="text-gray-600">Discover amazing geological finds from the community</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Post
        </Link>
      </div>

      {/* Feed Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex gap-2">
            {[
              { key: 'recent', label: 'Recent', icon: Clock },
              { key: 'popular', label: 'Popular', icon: TrendingUp },
              { key: 'following', label: 'Following', icon: User }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Social Feed Posts */}
      {posts.length === 0 && !loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-6">Be the first to share a rock discovery!</p>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Share First Rock
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.userId?.username || 'Rock Explorer'}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatTimeAgo(post.createdAt)}</span>
                        {post.location?.address && (
                          <>
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{post.location.address}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Rock Type Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRockTypeColor(post.rockType)}`}>
                    {post.rockType?.charAt(0).toUpperCase() + post.rockType?.slice(1)}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.description}</p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Image */}
              {post.photo && (
                <div className="relative">
                  <img
                    src={post.photo}
                    alt={post.title}
                    className="w-full h-64 md:h-80 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post._id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                      <span>{post.likes?.length || 0} likes</span>
                    </button>
                    
                    <button
                      onClick={() => toggleComments(post._id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments?.length || 0} comments</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {showComments[post._id] && (
                  <div className="space-y-4">
                    {/* Add Comment */}
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment[post._id] || ''}
                            onChange={(e) => setNewComment(prev => ({ 
                              ...prev, 
                              [post._id]: e.target.value 
                            }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleComment(post._id)
                              }
                            }}
                          />
                          <button
                            onClick={() => handleComment(post._id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Existing Comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-3">
                        {post.comments.map((comment, index) => (
                          <div key={index} className="flex space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg px-3 py-2">
                                <p className="font-medium text-sm text-gray-900">
                                  {comment.userId?.username || 'Anonymous'}
                                </p>
                                <p className="text-gray-700">{comment.text}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimeAgo(comment.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SocialFeed