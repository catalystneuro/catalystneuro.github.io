import { render, screen } from '../../test/utils'
import { LatestPosts } from '../LatestPosts'
import { describe, it, expect, vi } from 'vitest'

// Mock the blogLoader module
vi.mock('@/utils/blogLoader', () => ({
  blogPosts: [
    {
      title: 'Latest Post',
      slug: 'latest-post',
      date: '2024-01-03',
      description: 'This is the latest post',
      content: 'Content here',
      image: '/images/latest.jpg',
      readTime: '5 min',
      keywords: ['latest', 'news', 'tech']
    },
    {
      title: 'Second Post',
      slug: 'second-post',
      date: '2024-01-02',
      description: 'This is the second post',
      content: 'Content here',
      image: '/images/second.jpg',
      readTime: '3 min',
      keywords: ['update', 'tech']
    },
    {
      title: 'Third Post',
      slug: 'third-post',
      date: '2024-01-01',
      description: 'This is the third post',
      content: 'Content here',
      image: '/images/third.jpg',
      readTime: '4 min',
      keywords: ['announcement']
    },
    {
      title: 'Fourth Post',
      slug: 'fourth-post',
      date: '2023-12-31',
      description: 'This should not appear',
      content: 'Content here',
      image: '/images/fourth.jpg',
      readTime: '2 min',
      keywords: ['old']
    }
  ]
}))

describe('LatestPosts', () => {
  it('renders the section title correctly', () => {
    render(<LatestPosts />)
    expect(screen.getByText('Latest News & Events')).toBeInTheDocument()
  })

  it('displays only the three most recent posts', () => {
    render(<LatestPosts />)
    
    // Should be present
    expect(screen.getByText('Latest Post')).toBeInTheDocument()
    expect(screen.getByText('Second Post')).toBeInTheDocument()
    expect(screen.getByText('Third Post')).toBeInTheDocument()
    
    // Should not be present
    expect(screen.queryByText('Fourth Post')).not.toBeInTheDocument()
  })

  it('renders post cards with correct content', () => {
    render(<LatestPosts />)
    
    const firstPost = {
      title: 'Latest Post',
      description: 'This is the latest post',
      keywords: ['latest', 'news', 'tech']
    }
    
    // Check title and description
    expect(screen.getByText(firstPost.title)).toBeInTheDocument()
    expect(screen.getByText(firstPost.description)).toBeInTheDocument()
    
    // Check keywords (tags)
      firstPost.keywords.forEach(keyword => {
        const elements = screen.getAllByText(keyword)
        expect(elements.length).toBeGreaterThan(0)
      })
    
    // Check images
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
    expect(images[0]).toHaveAttribute('src', '/images/latest.jpg')
    expect(images[0]).toHaveAttribute('alt', 'Latest Post')
  })

  it('renders correct links for each post', () => {
    render(<LatestPosts />)
    
    // Check post links
    expect(screen.getByRole('link', { name: /Latest Post/i })).toHaveAttribute('href', '/blog/latest-post')
    expect(screen.getByRole('link', { name: /Second Post/i })).toHaveAttribute('href', '/blog/second-post')
    expect(screen.getByRole('link', { name: /Third Post/i })).toHaveAttribute('href', '/blog/third-post')
  })

  it('renders the View All Posts button with correct link', () => {
    render(<LatestPosts />)
    
    const viewAllButton = screen.getByRole('link', { name: 'View All Posts' })
    expect(viewAllButton).toBeInTheDocument()
    expect(viewAllButton).toHaveAttribute('href', '/blog')
  })

  it('applies hover styles to post cards', () => {
    render(<LatestPosts />)
    
    const cards = screen.getAllByRole('link').slice(0, 3) // Get only post cards, not the View All link
    cards.forEach(card => {
      expect(card.querySelector('.hover\\:shadow-lg')).toBeInTheDocument()
    })
  })
})
