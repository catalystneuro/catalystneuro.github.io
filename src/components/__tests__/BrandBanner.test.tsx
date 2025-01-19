import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { BrandBanner } from '../BrandBanner'

describe('BrandBanner', () => {
  it('renders heading correctly', () => {
    render(<BrandBanner />)
    expect(screen.getByText('Trusted By Leading Institutions')).toBeInTheDocument()
  })

  it('renders all brand logos with correct alt text', () => {
    render(<BrandBanner />)
    
    const expectedBrands = [
      'NIH',
      'Allen Institute',
      'Kavli Foundation',
      'Michael J. Fox Foundation',
      'Simons Foundation',
      'MIT'
    ]

    // Each brand appears twice due to the duplicate set for animation
    expectedBrands.forEach(brand => {
      const logos = screen.getAllByAltText(brand)
      expect(logos).toHaveLength(2) // Original and duplicate
      logos.forEach(logo => {
        expect(logo).toHaveAttribute('src')
        expect(logo).toHaveClass('w-full', 'h-full', 'object-contain')
      })
    })
  })

  it('renders gradient overlays', () => {
    render(<BrandBanner />)
    
    // Left gradient
    const leftGradient = screen.getByTestId('left-gradient')
    expect(leftGradient).toHaveClass(
      'absolute',
      'left-0',
      'bg-gradient-to-r',
      'from-white',
      'to-transparent'
    )

    // Right gradient
    const rightGradient = screen.getByTestId('right-gradient')
    expect(rightGradient).toHaveClass(
      'absolute',
      'right-0',
      'bg-gradient-to-l',
      'from-white',
      'to-transparent'
    )
  })

  it('applies hover effects to logo containers', () => {
    render(<BrandBanner />)
    
    const logoContainers = screen.getAllByTestId('logo-container')
    logoContainers.forEach(container => {
      expect(container).toHaveClass(
        'grayscale',
        'hover:grayscale-0',
        'transition-all'
      )
    })
  })
})
