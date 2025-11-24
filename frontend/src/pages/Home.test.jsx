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
    const rockSpotterElements = screen.getAllByText(/Rock Spotter/i)
    expect(rockSpotterElements.length).toBeGreaterThan(0)
  })

  it('should render call-to-action buttons', () => {
    renderWithRouter(<Home />)
    const joinButtons = screen.getAllByText(/Join the Community/i)
    expect(joinButtons.length).toBeGreaterThan(0)
    expect(screen.getByText(/Get Started Now/i)).toBeInTheDocument()
  })

  it('should render feature sections', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('heading', { name: /Social Feed/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Share Your Finds/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Join Discussions/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Rock Hunts & Adventures/i })).toBeInTheDocument()
  })

  it('should have working navigation links', () => {
    renderWithRouter(<Home />)
    const joinButton = screen.getAllByText(/Join the Community/i)[0]
    expect(joinButton.closest('a')).toHaveAttribute('href', '/register')
  })
})
