import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '../../test/utils'
import { BlogPost } from '../BlogPost'
import * as router from 'react-router-dom'
import * as blogLoader from '@/utils/blogLoader'
import type { BlogPost as BlogPostType } from '@/utils/blogLoader'

// Mock react-router-dom's useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as typeof router
  return {
    ...actual,
    useParams: vi.fn()
  }
})

// Mock sample blog post data
const mockPost: BlogPostType = {
  slug: 'test-post',
  title: 'Test Blog Post',
  date: '2024-01-01',
  readTime: '5 min read',
  image: '/test-image.jpg',
  content: `
# Heading 1
## Heading 2
Regular paragraph text

\`\`\`python
def hello():
    print("Hello World!")
\`\`\`

- List item 1
- List item 2
  `,
  gallery: ['/gallery1.jpg', '/gallery2.jpg'],
  description: 'A test blog post',
  keywords: ['test', 'blog']
}

describe('BlogPost', () => {
  beforeEach(() => {
    // Mock useParams to return our test slug
    vi.mocked(router.useParams).mockReturnValue({ slug: 'test-post' })
    
    // Mock blogPosts to include our test post
    vi.spyOn(blogLoader, 'blogPosts', 'get').mockReturnValue([mockPost])
  })

  it('renders blog post content correctly', () => {
    render(<BlogPost />)
    
    // Test basic content
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    // Date and read time are combined in a single element
    expect(screen.getByText(/Published on 2024-01-01/)).toBeInTheDocument()
    expect(screen.getByText(/5 min read/)).toBeInTheDocument()
    
    // Test markdown headings (regex to handle anchor link prefix)
    expect(screen.getByRole('heading', { name: /Heading 1/, level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Heading 2/, level: 2 })).toBeInTheDocument()
    
    // Test list items
    expect(screen.getByText('List item 1')).toBeInTheDocument()
    expect(screen.getByText('List item 2')).toBeInTheDocument()
  })

  it('renders code blocks with syntax highlighting', () => {
    render(<BlogPost />)
    
    // Test code block
    const codeBlock = screen.getByRole('code')
    expect(codeBlock).toHaveClass('language-python')
    expect(codeBlock.textContent).toContain('print("Hello World!")')
  })

  it('renders images with proper attributes', () => {
    render(<BlogPost />)
    
    // Test main blog image
    const mainImage = screen.getByRole('img', { name: 'Test Blog Post' })
    expect(mainImage).toHaveAttribute('src', '/test-image.jpg')
    expect(mainImage).toHaveClass('object-cover')
  })

  it('renders gallery when available', () => {
    render(<BlogPost />)
    
    // Test gallery section
    expect(screen.getByText('Image Gallery')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Gallery image 1' })).toBeInTheDocument()
    // Navigation buttons should be present
    const prevButton = screen.getByLabelText('Previous image')
    const nextButton = screen.getByLabelText('Next image')
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('shows error message when post is not found', () => {
    // Mock useParams with non-existent slug
    vi.mocked(router.useParams).mockReturnValue({ slug: 'non-existent' })
    
    render(<BlogPost />)
    expect(screen.getByText('Post not found')).toBeInTheDocument()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
})
