/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Logger Utility - Environment-aware logging
 */

const isDevelopment = import.meta.env.MODE === 'development'

/**
 * Logger utility that only logs in development mode
 */
export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
  
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args)
    }
    // In production, you could send to error tracking service like Sentry
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
  
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  }
}

export default logger
