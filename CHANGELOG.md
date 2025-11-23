# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Testing Infrastructure**: Vitest and React Testing Library setup
  - Test utilities and configuration
  - Sample tests for Home page and Navbar component
  - Code coverage support with V8
- **Component Architecture Improvements**:
  - Split SocialFeed into smaller, reusable components
  - Created FeedPost component for individual post rendering
  - Created FeedFilters component for feed filtering UI
- **Code Quality Improvements**:
  - Added logger utility for environment-aware logging
  - ESLint rules to prevent console.log statements
  - ESLint rules to warn on large components (>300 lines)
  - ESLint rules to encourage smaller functions (<100 lines)
  - .nvmrc file for Node version consistency
- **Enhanced HTML Pages**:
  - Professional loading screen with branded logo and animations
  - Comprehensive SEO meta tags (title, description, keywords)
  - Open Graph and Twitter Card tags for social media sharing
  - Responsive loading states with accessibility support
  - Styled 404 page for GitHub Pages routing

### Changed
- Updated package.json with testing dependencies
- Enhanced vite.config.js with Vitest configuration
- Improved ESLint configuration with production-quality rules

### Security
- All console.log statements should use logger utility to prevent info leakage

## [0.0.0] - 2025-01-01

### Added
- Initial Rock Spotter platform
- Social feed functionality
- Rock hunting system
- Achievement system
- User authentication
- Moderation dashboard
- Deployment configurations for multiple platforms
