import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { Navigation } from '../Navigation'
import userEvent from '@testing-library/user-event'

describe('Navigation', () => {
  it('renders the logo with correct link', () => {
    render(<Navigation />)
    const logos = screen.getAllByAltText('CatalystNeuro')
    expect(logos.length).toBe(2) // Mobile and desktop logos
    logos.forEach(logo => {
      expect(logo.closest('a')).toHaveAttribute('href', '/')
    })
  })

  it('renders all main navigation items', () => {
    render(<Navigation />)
    const mainLinks = ['About', 'Team', 'Software', 'Portfolio', 'Blog', 'Openings', 'Contact']
    mainLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  it('renders GitHub link', () => {
    render(<Navigation />)
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/catalystneuro')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('shows dropdown menu items when Portfolio is clicked', async () => {
    render(<Navigation />)
    const portfolioTrigger = screen.getByText('Portfolio')
    await userEvent.click(portfolioTrigger)
    
    const dropdownItems = ['NWB Conversions', 'Funded Projects']
    dropdownItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  // Test mobile menu
  it('shows mobile menu button on small screens', () => {
    // Mock small viewport
    window.innerWidth = 500
    window.dispatchEvent(new Event('resize'))
    
    render(<Navigation />)
    const menuButton = screen.getByRole('menuitem')
    expect(menuButton).toBeInTheDocument()
  })
})
