/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * FeedPost Component - Individual post card in the social feed
 */

import { useState } from 'react'
import SmartImage from './SmartImage'
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  User,
  Repeat2,
  Bookmark
} from 'lucide-react'

const FeedPost = ({
  post,
  isLiked,
  isReposted,
  isFavorited,
  showComments,
  newComment,
  onLike,
  onRepost,
  onFavorite,
  onShare,
  onToggleComments,
  onCommentChange,
  onSubmitComment,
  formatTimeAgo,
  getRockTypeColor
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRockTypeColor(post.rockType)}`}>
            {post.rockType}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-700 mb-4">{post.description}</p>

        {/* Rock Image */}
        {post.imageUrl && (
          <SmartImage
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <button
            onClick={() => onLike(post._id)}
            className={`flex items-center space-x-1 hover:text-red-600 transition-colors ${
              isLiked ? 'text-red-600' : ''
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes || 0}</span>
          </button>

          <button
            onClick={() => onToggleComments(post._id)}
            className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments?.length || 0}</span>
          </button>

          <button
            onClick={() => onRepost(post._id)}
            className={`flex items-center space-x-1 hover:text-green-600 transition-colors ${
              isReposted ? 'text-green-600' : ''
            }`}
          >
            <Repeat2 className="h-5 w-5" />
            <span>{post.reposts || 0}</span>
          </button>

          <button
            onClick={() => onShare(post._id)}
            className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
          >
            <Share2 className="h-5 w-5" />
          </button>

          <button
            onClick={() => onFavorite(post._id)}
            className={`flex items-center space-x-1 hover:text-yellow-600 transition-colors ${
              isFavorited ? 'text-yellow-600' : ''
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="space-y-3">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 bg-white p-2 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{comment.username || 'User'}</p>
                    <p className="text-sm text-gray-700">{comment.text || comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">No comments yet. Be the first to comment!</p>
            )}

            {/* Add Comment */}
            <div className="flex space-x-2 mt-3">
              <input
                type="text"
                value={newComment || ''}
                onChange={(e) => onCommentChange(post._id, e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSubmitComment(post._id)
                  }
                }}
              />
              <button
                onClick={() => onSubmitComment(post._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedPost
