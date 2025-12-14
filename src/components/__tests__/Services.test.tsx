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
    it('renders NWB Conversion Pipelines card', () => {
      const card = screen.getByText('NWB Conversion Pipelines')
      expect(card).toBeInTheDocument()
      
      // Check features
      expect(screen.getByText('NIH data sharing policy compliance')).toBeInTheDocument()
      expect(screen.getByText('DANDI Archive integration')).toBeInTheDocument()
      expect(screen.getByText('Comprehensive metadata support')).toBeInTheDocument()
      expect(screen.getByText('Analysis tool ecosystem access')).toBeInTheDocument()
    })

    it('renders Spike Sorting Pipelines card', () => {
      const card = screen.getByText('Spike Sorting Pipelines')
      expect(card).toBeInTheDocument()
      
      // Check features
      expect(screen.getByText('Technology-specific customization')).toBeInTheDocument()
      expect(screen.getByText('Open source implementation')).toBeInTheDocument()
      expect(screen.getByText('Team training and support')).toBeInTheDocument()
      expect(screen.getByText('Pipeline modification guidance')).toBeInTheDocument()
    })

    it('renders Grant Applications card', () => {
      const card = screen.getByText('Grant Applications')
      expect(card).toBeInTheDocument()
      
      // Check features
      expect(screen.getByText('Data standardization & sharing')).toBeInTheDocument()
      expect(screen.getByText('Electronic lab notebooks')).toBeInTheDocument()
      expect(screen.getByText('Data dashboards & visualization')).toBeInTheDocument()
      expect(screen.getByText('Cloud technology integration')).toBeInTheDocument()
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

  // Service cards now have "Get Started" buttons that link to /contact
  it('renders Get Started buttons for each service card', () => {
    const getStartedButtons = screen.getAllByRole('button', { name: /get started/i })
    expect(getStartedButtons).toHaveLength(3)
  })

  it('links Get Started buttons to contact page', () => {
    const getStartedLinks = screen.getAllByRole('link', { name: /get started/i })
    getStartedLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/contact')
    })
  })
})
