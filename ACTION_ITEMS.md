# Rock Spotter - Prioritized Action Items

**Generated:** November 23, 2025  
**Status:** Ready for Implementation  

This document provides a prioritized, actionable task list based on the comprehensive repository review.

---

## 🚨 P0: CRITICAL (Start Immediately)

These items pose security risks or prevent reliable development. **Must be addressed before any major releases.**

### P0-1: Fix Security Vulnerabilities
**Owner:** TBD  
**Estimated Time:** 4-6 hours  
**Due Date:** Within 1 week  

#### Tasks:
- [ ] Remove hardcoded JWT secret fallback in `backend/src/controllers/userController.js` and `backend/src/middleware/auth.js`
- [ ] Remove hardcoded admin credentials in `backend/src/controllers/userController.js` (lines 34-40)
- [ ] Install and configure helmet.js for security headers
  ```bash
  cd backend && npm install helmet
  ```
- [ ] Install and configure rate limiting
  ```bash
  cd backend && npm install express-rate-limit
  ```
- [ ] Add rate limiting to all API routes (100 requests per 15 minutes)
- [ ] Increase minimum password length from 6 to 8 characters
- [ ] Add password complexity requirements (uppercase, lowercase, number)
- [ ] Create environment variable validation at startup
- [ ] Document all required environment variables

**Acceptance Criteria:**
- No hardcoded secrets in codebase
- All endpoints have rate limiting
- Security headers present in all responses
- Environment variables validated at startup

**Files to Modify:**
- `backend/src/server.js`
- `backend/src/controllers/userController.js`
- `backend/src/middleware/auth.js`
- `backend/src/models/User.js`

---

### P0-2: Establish Testing Infrastructure
**Owner:** TBD  
**Estimated Time:** 8-12 hours  
**Due Date:** Within 2 weeks  

#### Tasks:
- [ ] Install backend testing dependencies
  ```bash
  cd backend
  npm install --save-dev jest supertest mongodb-memory-server @types/jest
  ```
- [ ] Create `backend/jest.config.js`
- [ ] Create test directory structure `backend/src/__tests__/`
- [ ] Write first 5 unit tests for User model
- [ ] Write first 5 integration tests for auth endpoints
- [ ] Add test scripts to `backend/package.json`:
  ```json
  {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
  ```
- [ ] Install frontend testing dependencies
  ```bash
  cd frontend
  npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
  ```
- [ ] Create `frontend/vitest.config.js`
- [ ] Write first 3 component tests
- [ ] Update CI/CD workflow to run tests
- [ ] Set up code coverage reporting

**Acceptance Criteria:**
- Test commands work in both backend and frontend
- At least 10 tests passing
- CI/CD runs tests on every PR
- Coverage reports generated

**Files to Create:**
- `backend/jest.config.js`
- `backend/src/__tests__/models/User.test.js`
- `backend/src/__tests__/controllers/userController.test.js`
- `frontend/vitest.config.js`
- `frontend/src/__tests__/components/Navbar.test.jsx`

---

### P0-3: Add Logging Infrastructure
**Owner:** TBD  
**Estimated Time:** 4-6 hours  
**Due Date:** Within 2 weeks  

#### Tasks:
- [ ] Install Winston
  ```bash
  cd backend && npm install winston winston-daily-rotate-file
  ```
- [ ] Create logger utility at `backend/src/utils/logger.js`
- [ ] Configure different log levels (error, warn, info, debug)
- [ ] Add file transport with rotation
- [ ] Add console transport for development
- [ ] Create request logging middleware
- [ ] Replace all `console.log` with logger calls
- [ ] Add correlation IDs to requests
- [ ] Configure log format (timestamp, level, message, metadata)
- [ ] Add error stack traces to error logs
- [ ] Document logging conventions

**Acceptance Criteria:**
- All console.log replaced with logger
- Logs written to files with rotation
- Different log levels working
- Request/response logging in place
- Error logging includes stack traces

**Files to Create:**
- `backend/src/utils/logger.js`
- `backend/src/middleware/requestLogger.js`

**Files to Modify:**
- `backend/src/server.js`
- All controller files
- All route files

---

## 🟠 P1: HIGH Priority (Complete Within 1 Month)

Critical for maintainability and developer experience.

### P1-1: Consolidate Backend and API Folders
**Owner:** TBD  
**Estimated Time:** 6-8 hours  
**Due Date:** Week 3  

#### Tasks:
- [ ] Install serverless-http for Vercel
  ```bash
  cd backend && npm install serverless-http
  ```
- [ ] Create Vercel adapter wrapper
- [ ] Update `vercel.json` to point to backend
- [ ] Test Vercel deployment with consolidated code
- [ ] Remove `/api` folder after verification
- [ ] Update documentation to reflect new structure
- [ ] Update all references in README files

**Acceptance Criteria:**
- Single source of truth in `/backend`
- Vercel deployment working
- `/api` folder removed
- No code duplication

---

### P1-2: Add Backend Linting and Formatting
**Owner:** TBD  
**Estimated Time:** 2-4 hours  
**Due Date:** Week 3  

#### Tasks:
- [ ] Install ESLint and Prettier
  ```bash
  cd backend
  npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-node
  ```
- [ ] Create `.eslintrc.js` for backend
- [ ] Create `.prettierrc` for backend
- [ ] Create `.prettierignore` for backend
- [ ] Run Prettier on all files
- [ ] Fix all ESLint errors
- [ ] Add lint scripts to package.json
- [ ] Update VS Code settings recommendation
- [ ] Add to pre-commit hooks (next task)

**Acceptance Criteria:**
- ESLint passes on all files
- Code formatted consistently
- Lint scripts working

---

### P1-3: Set Up Git Hooks
**Owner:** TBD  
**Estimated Time:** 2-3 hours  
**Due Date:** Week 4  

#### Tasks:
- [ ] Install Husky and related tools
  ```bash
  npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional
  ```
- [ ] Initialize Husky
  ```bash
  npx husky install
  ```
- [ ] Create pre-commit hook (lint-staged)
- [ ] Create commit-msg hook (commitlint)
- [ ] Create pre-push hook (tests)
- [ ] Configure lint-staged in package.json
- [ ] Document commit message conventions
- [ ] Update CONTRIBUTING.md

**Acceptance Criteria:**
- Pre-commit runs linters
- Commit messages validated
- Pre-push runs tests
- Documented for contributors

---

### P1-4: Implement OpenAPI Documentation
**Owner:** TBD  
**Estimated Time:** 6-10 hours  
**Due Date:** Week 4  

#### Tasks:
- [ ] Install Swagger dependencies
  ```bash
  cd backend && npm install swagger-jsdoc swagger-ui-express
  ```
- [ ] Create OpenAPI base configuration
- [ ] Add JSDoc comments to all route handlers
- [ ] Document request/response schemas
- [ ] Add example requests/responses
- [ ] Configure Swagger UI at `/api/docs`
- [ ] Add authentication documentation
- [ ] Add error response documentation
- [ ] Generate OpenAPI spec file
- [ ] Link from main README

**Acceptance Criteria:**
- All endpoints documented
- Swagger UI accessible
- Examples included
- Schemas defined

---

### P1-5: Add Database Migration System
**Owner:** TBD  
**Estimated Time:** 4-6 hours  
**Due Date:** Week 4  

#### Tasks:
- [ ] Install migrate-mongo
  ```bash
  cd backend && npm install migrate-mongo
  ```
- [ ] Initialize migration system
  ```bash
  npx migrate-mongo init
  ```
- [ ] Create initial migration for current schema
- [ ] Add migration scripts to package.json
- [ ] Document migration workflow
- [ ] Add migrations to deployment process
- [ ] Create sample migration template

**Acceptance Criteria:**
- Migration system working
- Initial schema documented
- Migration scripts in package.json
- Documented process

---

## 🟡 P2: MEDIUM Priority (Complete Within 3 Months)

Important for production readiness and user experience.

### P2-1: Integrate Sentry Error Tracking
**Owner:** TBD  
**Estimated Time:** 3-4 hours  
**Due Date:** Week 6  

#### Tasks:
- [ ] Create Sentry account
- [ ] Install Sentry SDKs
  ```bash
  cd backend && npm install @sentry/node
  cd ../frontend && npm install @sentry/react
  ```
- [ ] Configure Sentry in backend
- [ ] Configure Sentry in frontend
- [ ] Add error boundaries in React
- [ ] Test error reporting
- [ ] Configure source maps upload
- [ ] Set up alerts for critical errors
- [ ] Document Sentry setup

---

### P2-2: Enhance CI/CD Workflows
**Owner:** TBD  
**Estimated Time:** 6-8 hours  
**Due Date:** Week 7  

#### Tasks:
- [ ] Create comprehensive test workflow
- [ ] Add security scanning workflow
- [ ] Configure Dependabot
- [ ] Add performance testing workflow
- [ ] Add automated deployment workflow
- [ ] Configure deployment protection
- [ ] Add stale issue management
- [ ] Create release workflow with changelog

---

### P2-3: Consolidate Documentation
**Owner:** TBD  
**Estimated Time:** 4-6 hours  
**Due Date:** Week 8  

#### Tasks:
- [ ] Create documentation structure in `/docs`
- [ ] Consolidate deployment guides
- [ ] Move historical fixes to archive
- [ ] Create documentation index
- [ ] Update main README
- [ ] Remove redundant files
- [ ] Create quick start guide
- [ ] Link all docs properly

---

### P2-4: Add Database Indexes
**Owner:** TBD  
**Estimated Time:** 2-3 hours  
**Due Date:** Week 9  

#### Tasks:
- [ ] Analyze query patterns
- [ ] Add indexes to User model
- [ ] Add indexes to Rock model
- [ ] Add indexes to Hunt model
- [ ] Test query performance
- [ ] Document indexes
- [ ] Monitor index usage

---

### P2-5: Implement Frontend Improvements
**Owner:** TBD  
**Estimated Time:** 12-16 hours  
**Due Date:** Week 12  

#### Tasks:
- [ ] Set up TypeScript (gradual migration)
- [ ] Add lazy loading for routes
- [ ] Implement error boundaries
- [ ] Add loading state components
- [ ] Install form validation library
- [ ] Extract API calls to hooks
- [ ] Add state management (if needed)
- [ ] Optimize bundle size
- [ ] Add accessibility improvements

---

## 🟢 P3: LOW Priority (Future Enhancements)

Nice to have features for better UX and developer experience.

### P3-1: PWA Features
**Due Date:** Month 4  
- [ ] Add service worker
- [ ] Create manifest.json
- [ ] Implement offline mode
- [ ] Add install prompt
- [ ] Cache static assets

### P3-2: Performance Monitoring
**Due Date:** Month 4  
- [ ] Set up APM (New Relic/DataDog)
- [ ] Monitor API response times
- [ ] Track frontend metrics
- [ ] Add database profiling
- [ ] Configure alerts

### P3-3: Advanced Integrations
**Due Date:** Month 5+  
- [ ] Integrate Cloudinary for images
- [ ] Add SendGrid for emails
- [ ] Implement Redis caching
- [ ] Add Google Maps
- [ ] Set up S3/DO Spaces

---

## 📊 Progress Tracking

### Weekly Review Questions
1. How many P0 items completed?
2. How many tests added this week?
3. What's the current test coverage?
4. Any security vulnerabilities found?
5. Any blockers or issues?

### Monthly Milestones

**End of Month 1:**
- [ ] All P0 items complete
- [ ] Test coverage > 50%
- [ ] No critical security issues
- [ ] CI/CD running tests

**End of Month 2:**
- [ ] All P1 items complete
- [ ] Test coverage > 70%
- [ ] Error tracking live
- [ ] API documented

**End of Month 3:**
- [ ] 50% of P2 items complete
- [ ] Test coverage > 80%
- [ ] Performance monitoring active
- [ ] Production ready

---

## 🎯 Success Criteria

### Definition of Done
Each task is considered complete when:
- [ ] Code changes implemented
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] PR reviewed and approved
- [ ] Deployed to staging
- [ ] Verified working

### Quality Gates
- ✅ All tests passing
- ✅ Code coverage not decreased
- ✅ No new ESLint errors
- ✅ No security vulnerabilities
- ✅ PR approved by 1+ reviewers

---

## 📝 Notes

**How to Use This Document:**
1. Assign owners to each task
2. Create GitHub issues for each P0/P1 item
3. Track progress weekly
4. Update completion status
5. Review and adjust priorities as needed

**Issue Labels to Create:**
- `priority: critical` (P0)
- `priority: high` (P1)
- `priority: medium` (P2)
- `priority: low` (P3)
- `type: security`
- `type: testing`
- `type: infrastructure`
- `type: documentation`

**Tracking:**
Create a GitHub Project board with columns:
- Backlog
- In Progress
- In Review
- Done

---

**Last Updated:** November 23, 2025  
**Document Status:** ✅ Ready for Use  
**Next Review:** After P0 completion
