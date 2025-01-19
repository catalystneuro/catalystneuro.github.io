import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { YouTubeEmbed } from '../YouTubeEmbed'

describe('YouTubeEmbed', () => {
  const testVideoId = 'test123'

  it('renders iframe with correct src URL', () => {
    render(<YouTubeEmbed videoId={testVideoId} />)
    const iframe = screen.getByTitle('YouTube video player')
    expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${testVideoId}`)
  })

  it('has correct iframe attributes', () => {
    render(<YouTubeEmbed videoId={testVideoId} />)
    const iframe = screen.getByTitle('YouTube video player')
    
    expect(iframe).toHaveAttribute('allowFullScreen')
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('accelerometer'))
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('autoplay'))
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('clipboard-write'))
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('encrypted-media'))
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('gyroscope'))
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('picture-in-picture'))
  })

  it('has correct container styling', () => {
    render(<YouTubeEmbed videoId={testVideoId} />)
    const container = screen.getByTestId('youtube-container')
    
    expect(container).toHaveClass(
      'relative',
      'w-full',
      'max-w-4xl',
      'mx-auto',
      'rounded-lg',
      'overflow-hidden',
      'shadow-lg',
      'aspect-video'
    )
  })

  it('iframe has correct dimensions', () => {
    render(<YouTubeEmbed videoId={testVideoId} />)
    const iframe = screen.getByTitle('YouTube video player')
    expect(iframe).toHaveClass('w-full', 'h-full')
  })
})
