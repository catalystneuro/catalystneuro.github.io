import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { Hero } from '../Hero'

describe('Hero', () => {
  it('renders main heading and subheading', () => {
    render(<Hero />)
    
    // Test main heading with its two parts
    expect(screen.getByText('Transforming Neurophysiology Data')).toBeInTheDocument()
    expect(screen.getByText('for Open Science')).toBeInTheDocument()
    
    // Test description text
    expect(screen.getByText(/We help research labs standardize, share, and publish/)).toBeInTheDocument()
  })

  it('renders action buttons with correct links', () => {
    render(<Hero />)
    
    // Get Started button
    const getStartedLink = screen.getByRole('link', { name: /get started/i })
    expect(getStartedLink).toHaveAttribute('href', '/software')
    
    // Learn More button
    const learnMoreLink = screen.getByRole('link', { name: /learn more/i })
    expect(learnMoreLink).toHaveAttribute('href', '/about')
  })

  it('renders buttons with correct visual elements', () => {
    render(<Hero />)
    
    // Get Started button should have an arrow icon
    const getStartedButton = screen.getByRole('link', { name: /get started/i })
    const arrowIcon = getStartedButton.querySelector('svg')
    expect(arrowIcon).toBeInTheDocument()
    expect(arrowIcon).toHaveClass('ml-2', 'h-4', 'w-4')
    
    // Both buttons should be rendered as links with button styling
    const buttons = [
      screen.getByRole('link', { name: /get started/i }),
      screen.getByRole('link', { name: /learn more/i })
    ]
    buttons.forEach(button => {
      const buttonElement = button.querySelector('button')
      expect(buttonElement).toBeInTheDocument()
    })
  })

  it('has accessible buttons', () => {
    render(<Hero />)
    
    // Verify buttons are properly labeled for screen readers
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName()
    })
  })
})
