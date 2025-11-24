/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * AI Gateway - Vercel AI integration for rock identification
 */

import logger from './logger'

/**
 * Configuration for AI Gateway
 */
const AI_CONFIG = {
  apiUrl: import.meta.env.VITE_AI_GATEWAY_URL || '/api/ai',
  cacheEnabled: true,
  cacheTTL: 86400, // 24 hours in seconds
}

/**
 * Identify a rock from an image URL or base64 data
 * 
 * @param {string} imageData - URL or base64 encoded image
 * @returns {Promise<Object>} Rock identification results
 * 
 * @example
 * const result = await identifyRock(imageUrl)
 * console.log(result.rockType) // "Granite"
 * console.log(result.confidence) // 0.95
 */
export async function identifyRock(imageData) {
  try {
    logger.log('[AI Gateway] Identifying rock from image...')
    
    // Check cache first (if enabled)
    if (AI_CONFIG.cacheEnabled) {
      const cached = getCachedResult(imageData)
      if (cached) {
        logger.log('[AI Gateway] Returning cached result')
        return cached
      }
    }

    // Call AI Gateway API
    const response = await fetch(AI_CONFIG.apiUrl + '/identify-rock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData,
        options: {
          detailed: true,
          includeConfidence: true,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`AI Gateway error: ${response.statusText}`)
    }

    const result = await response.json()
    
    // Cache the result
    if (AI_CONFIG.cacheEnabled) {
      cacheResult(imageData, result)
    }

    logger.log('[AI Gateway] Rock identified:', result.rockType)
    return result

  } catch (error) {
    logger.error('[AI Gateway] Error identifying rock:', error)
    
    // Return demo data as fallback
    return getDemoIdentification()
  }
}

/**
 * Get enhanced description for a rock post
 * 
 * @param {string} userInput - User's original description
 * @param {string} rockType - Identified rock type
 * @returns {Promise<string>} Enhanced description
 */
export async function enhanceDescription(userInput, rockType = null) {
  try {
    logger.log('[AI Gateway] Enhancing description...')

    const response = await fetch(AI_CONFIG.apiUrl + '/enhance-description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput,
        rockType,
      })
    })

    if (!response.ok) {
      throw new Error(`AI Gateway error: ${response.statusText}`)
    }

    const result = await response.json()
    return result.enhancedDescription

  } catch (error) {
    logger.error('[AI Gateway] Error enhancing description:', error)
    return userInput // Return original input as fallback
  }
}

/**
 * Find similar rocks based on an image
 * 
 * @param {string} imageData - Image to search for
 * @returns {Promise<Array>} Array of similar rock posts
 */
export async function findSimilarRocks(imageData) {
  try {
    logger.log('[AI Gateway] Finding similar rocks...')

    const response = await fetch(AI_CONFIG.apiUrl + '/find-similar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData,
        limit: 5,
      })
    })

    if (!response.ok) {
      throw new Error(`AI Gateway error: ${response.statusText}`)
    }

    const result = await response.json()
    return result.similarRocks || []

  } catch (error) {
    logger.error('[AI Gateway] Error finding similar rocks:', error)
    return []
  }
}

/**
 * Cache management using localStorage
 */
function getCachedResult(imageData) {
  try {
    const cacheKey = generateCacheKey(imageData)
    const cached = localStorage.getItem(`ai_cache_${cacheKey}`)
    
    if (!cached) return null

    const { result, timestamp } = JSON.parse(cached)
    const age = (Date.now() - timestamp) / 1000

    if (age > AI_CONFIG.cacheTTL) {
      localStorage.removeItem(`ai_cache_${cacheKey}`)
      return null
    }

    return result
  } catch (error) {
    logger.error('[AI Gateway] Cache read error:', error)
    return null
  }
}

function cacheResult(imageData, result) {
  try {
    const cacheKey = generateCacheKey(imageData)
    localStorage.setItem(`ai_cache_${cacheKey}`, JSON.stringify({
      result,
      timestamp: Date.now()
    }))
  } catch (error) {
    logger.error('[AI Gateway] Cache write error:', error)
  }
}

function generateCacheKey(imageData) {
  // Simple hash function for cache key
  let hash = 0
  const str = imageData.substring(0, 100) // Use first 100 chars for hash
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * Demo data for when AI Gateway is not available
 */
function getDemoIdentification() {
  return {
    rockType: 'Granite',
    confidence: 0.85,
    mineralComposition: ['Quartz', 'Feldspar', 'Mica'],
    description: 'This appears to be granite, a common igneous rock formed from cooled magma. It contains visible crystals of quartz (clear/white), feldspar (pink/white), and mica (black flakes).',
    geologicalAge: 'Variable, typically millions of years old',
    commonLocations: ['Mountains', 'Continental crust', 'Plutonic environments'],
    hardness: '6-7 on Mohs scale',
    uses: ['Construction', 'Countertops', 'Monuments'],
    isDemo: true,
    note: 'AI Gateway not configured. Using demo data. Set VITE_AI_GATEWAY_URL in .env to enable AI features.'
  }
}

export default {
  identifyRock,
  enhanceDescription,
  findSimilarRocks,
}
