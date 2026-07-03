import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { BrandBanner } from '../BrandBanner'

describe('BrandBanner', () => {
  it('renders heading correctly', () => {
    render(<BrandBanner />)
    expect(screen.getByText('Our Partners')).toBeInTheDocument()
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

    expectedBrands.forEach(brand => {
      const logo = screen.getByAltText(brand)
      expect(logo).toHaveAttribute('src')
      expect(logo).toHaveClass('max-h-full', 'max-w-full', 'object-contain')
    })
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
