import { render, screen, fireEvent } from '../../test/utils'
import { Gallery } from '../Gallery'
import { describe, it, expect, vi } from 'vitest'

describe('Gallery', () => {
  const mockImages = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg'
  ]

  const mockVideos = [
    'video.mp4',
    'clip.webm'
  ]

  const mockYouTubeUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ'
  ]

  it('renders nothing when no images are provided', () => {
    const { container } = render(<Gallery images={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a single image correctly', () => {
    render(<Gallery images={[mockImages[0]]} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', mockImages[0])
    expect(img).toHaveAttribute('alt', 'Gallery image 1')
  })

  it('renders navigation buttons only when multiple images are provided', () => {
    // Single image
    const { rerender } = render(<Gallery images={[mockImages[0]]} />)
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument()

    // Multiple images
    rerender(<Gallery images={mockImages} />)
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument()
    expect(screen.getByLabelText('Next image')).toBeInTheDocument()
  })

  it('handles image navigation correctly', () => {
    render(<Gallery images={mockImages} />)
    
    // Initial state
    let img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', mockImages[0])

    // Navigate forward
    fireEvent.click(screen.getByLabelText('Next image'))
    img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', mockImages[1])

    // Navigate backward
    fireEvent.click(screen.getByLabelText('Previous image'))
    img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', mockImages[0])

    // Wrap around to last image
    fireEvent.click(screen.getByLabelText('Previous image'))
    img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', mockImages[2])
  })

  it('renders indicator dots for multiple images', () => {
    render(<Gallery images={mockImages} />)
    const dots = screen.getAllByRole('generic').filter(
      element => element.className.includes('h-2 w-2 rounded-full')
    )
    expect(dots).toHaveLength(mockImages.length)
    expect(dots[0].className).toContain('bg-primary') // First dot should be active
  })

  it('renders local video with correct attributes', () => {
    render(<Gallery images={[mockVideos[0]]} />)
    const video = screen.getByTestId('video-player')
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('loop')
    expect(video.querySelector('source')).toHaveAttribute('type', 'video/mp4')
  })

  it('renders YouTube video with correct embed URL', () => {
    render(<Gallery images={[mockYouTubeUrls[0]]} />)
    const iframe = screen.getByTitle('YouTube video player')
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0')
    expect(iframe).toHaveAttribute('allowFullScreen')
  })

  it('applies custom className and style props', () => {
    const customClass = 'custom-gallery'
    const customAspectRatio = '4/3'
    const customWidth = '500px'

    render(
      <Gallery 
        images={[mockImages[0]]} 
        className={customClass}
        aspectRatio={customAspectRatio}
        width={customWidth}
      />
    )

    const container = screen.getByRole('img').closest('div')
    expect(container).toHaveClass(customClass)
    expect(container).toHaveStyle({ aspectRatio: customAspectRatio, width: customWidth })
  })
})
