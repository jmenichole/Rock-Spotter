/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Navbar Component Tests
 */

import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter, mockUser } from '../test/test-utils'
import Navbar from './Navbar'

describe('Navbar Component', () => {
  it('should render logo and home link', () => {
    renderWithRouter(<Navbar isAuthenticated={false} user={null} onLogout={vi.fn()} />)
    const homeLink = screen.getByRole('link', { name: /rock spotter/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should show login and signup buttons when not authenticated', () => {
    renderWithRouter(<Navbar isAuthenticated={false} user={null} onLogout={vi.fn()} />)
    expect(screen.getByText(/Login/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
  })

  it('should show navigation menu when authenticated', () => {
    renderWithRouter(<Navbar isAuthenticated={true} user={mockUser} onLogout={vi.fn()} />)
    expect(screen.getByText(/Feed/i)).toBeInTheDocument()
    expect(screen.getByText(/Gallery/i)).toBeInTheDocument()
  })

  it('should call onLogout when logout is clicked', async () => {
    const user = userEvent.setup()
    const mockLogout = vi.fn()
    renderWithRouter(<Navbar isAuthenticated={true} user={mockUser} onLogout={mockLogout} />)
    
    // Click user dropdown
    const userButton = screen.getByRole('button', { name: /testuser/i })
    await user.click(userButton)
    
    // Click logout
    const logoutButton = screen.getByText(/Logout/i)
    await user.click(logoutButton)
    
    expect(mockLogout).toHaveBeenCalled()
  })

  it('should show admin badge for admin users', () => {
    const adminUser = { ...mockUser, role: 'admin' }
    renderWithRouter(<Navbar isAuthenticated={true} user={adminUser} onLogout={vi.fn()} />)
    expect(screen.getByText(/Admin/i)).toBeInTheDocument()
  })
})
