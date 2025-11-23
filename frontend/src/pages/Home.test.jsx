/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Home Page Tests
 */

import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import Home from './Home'

describe('Home Page', () => {
  it('should render the welcome message', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument()
    expect(screen.getByText(/Rock Spotter/i)).toBeInTheDocument()
  })

  it('should render call-to-action buttons', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Join the Community/i)).toBeInTheDocument()
    expect(screen.getByText(/Get Started Now/i)).toBeInTheDocument()
  })

  it('should render feature sections', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Social Feed/i)).toBeInTheDocument()
    expect(screen.getByText(/Share Your Finds/i)).toBeInTheDocument()
    expect(screen.getByText(/Join Discussions/i)).toBeInTheDocument()
    expect(screen.getByText(/Rock Hunts & Adventures/i)).toBeInTheDocument()
  })

  it('should have working navigation links', () => {
    renderWithRouter(<Home />)
    const joinButton = screen.getAllByText(/Join the Community/i)[0]
    expect(joinButton.closest('a')).toHaveAttribute('href', '/register')
  })
})
