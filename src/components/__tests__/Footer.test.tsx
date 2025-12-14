import { render, screen } from '../../test/utils'
import Footer from '../Footer'
import { describe, it, expect } from 'vitest'

describe('Footer', () => {
  it('renders all navigation links with correct hrefs', () => {
    render(<Footer />)
    
    // Company section links
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Team' })).toHaveAttribute('href', '/team')
    expect(screen.getByRole('link', { name: 'Careers' })).toHaveAttribute('href', '/openings')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    
    // Resources section links
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
    expect(screen.getByRole('link', { name: 'Funded Projects' })).toHaveAttribute('href', '/funded-projects')
    expect(screen.getByRole('link', { name: 'NWB Software' })).toHaveAttribute('href', '/nwb-software')
    expect(screen.getByRole('link', { name: 'Analysis Software' })).toHaveAttribute('href', '/analysis-software')
  })

  it('renders social media links with correct attributes', () => {
    render(<Footer />)
    
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/catalystneuro')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' })
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/catalystneuro')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders contact email correctly', () => {
    render(<Footer />)
    
    const emailLink = screen.getByRole('link', { name: 'info@catalystneuro.com' })
    expect(emailLink).toHaveAttribute('href', 'mailto:info@catalystneuro.com')
  })

  it('renders copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    
    expect(screen.getByText(`© ${currentYear} CatalystNeuro. All rights reserved.`)).toBeInTheDocument()
  })

  it('renders all section headings', () => {
    render(<Footer />)
    
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
    // Contact appears as both a heading and a link, so check for heading specifically
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })
})
