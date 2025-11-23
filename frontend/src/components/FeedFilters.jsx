/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * FeedFilters Component - Filter buttons for the social feed
 */

import { Filter, Clock, TrendingUp, User } from 'lucide-react'

const FeedFilters = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'recent', label: 'Recent', icon: Clock },
    { key: 'popular', label: 'Popular', icon: TrendingUp },
    { key: 'following', label: 'Following', icon: User }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <div className="flex gap-2">
          {filters.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentFilter === key
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
  )
}

export default FeedFilters
