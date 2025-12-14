import { render, screen } from '../../test/utils'
import { Services } from '../Services'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Services', () => {
  beforeEach(() => {
    render(<Services />)
  })

  it('renders the main heading and description', () => {
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText(/CatalystNeuro has worked successfully/)).toBeInTheDocument()
  })

  describe('Main Service Cards', () => {
    it('renders Open Data Management card', () => {
      const card = screen.getByText('Open Data Management')
      expect(card).toBeInTheDocument()
      
      // Check features
      expect(screen.getByText('Open source conversion pipeline')).toBeInTheDocument()
      expect(screen.getByText('Compliance with government and foundation funders')).toBeInTheDocument()
      expect(screen.getByText('Includes notebooks demonstrating data use')).toBeInTheDocument()
      expect(screen.getByText('Experience with 60+ labs')).toBeInTheDocument()
    })

    it('renders Software Engineering card', () => {
      const card = screen.getByText('Software Engineering')
      expect(card).toBeInTheDocument()
      
      // Check features
      expect(screen.getByText('Professionalize software through packaging, testing, and documentation')).toBeInTheDocument()
      expect(screen.getByText('Create reproducible workflows for data processing and analysis')).toBeInTheDocument()
    })

    it('renders AI in Neuro card', () => {
      const card = screen.getByText('AI in Neuro')
      expect(card).toBeInTheDocument()
      
      // Check features
      expect(screen.getByText('Develop agents to automate processing steps')).toBeInTheDocument()
      expect(screen.getByText('Data curation for building neural foundation models')).toBeInTheDocument()
      expect(screen.getByText('Training in agentic code generation')).toBeInTheDocument()
    })

    it('applies hover styles to service cards', () => {
      const cards = screen.getAllByTestId('service-card')
      cards.forEach(card => {
        expect(card).toHaveClass('group', 'hover:shadow-lg', 'transition-all', 'duration-300', 'hover:-translate-y-1')
      })
    })
  })

  describe('Additional Capabilities', () => {
    it('renders the additional capabilities section', () => {
      expect(screen.getByText('Additional Capabilities')).toBeInTheDocument()
    })

    it('renders all capability items', () => {
      const capabilities = [
        'Cloud Integration',
        'Team Training',
        'Data Analytics',
        'Open Source'
      ]

      capabilities.forEach(capability => {
        expect(screen.getByText(capability)).toBeInTheDocument()
      })
    })

    it('applies hover styles to capability icons', () => {
      const iconContainers = screen.getAllByRole('generic').filter(
        element => element.className.includes('group-hover:scale-110')
      )
      expect(iconContainers.length).toBeGreaterThan(0)
      iconContainers.forEach(container => {
        expect(container).toHaveClass('group-hover:scale-110', 'transition-transform')
      })
    })
  })

  describe('Service Card Icons', () => {
    it('renders icons with correct styling', () => {
      const iconContainers = screen.getAllByRole('generic').filter(
        element => element.className.includes('bg-primary/10')
      )
      
      iconContainers.forEach(container => {
        expect(container).toHaveClass('w-12', 'h-12', 'rounded-lg', 'bg-primary/10')
        const icon = container.querySelector('svg')
        expect(icon).toHaveClass('w-6', 'h-6', 'text-primary')
      })
    })
  })

  // Note: "Get Started" buttons are currently commented out in the component
})
