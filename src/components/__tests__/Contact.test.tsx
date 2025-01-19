import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../test/utils'
import { Contact } from '../Contact'
import userEvent from '@testing-library/user-event'

// Mock fetch for testing API calls
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Contact', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    vi.stubEnv('DEV', true) // Enable development mode for testing handleSubmit
  })

  it('renders contact information correctly', () => {
    render(<Contact />)
    
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('Email us at:')).toBeInTheDocument()
    
    const emailLink = screen.getByText('info@catalystneuro.com')
    expect(emailLink).toHaveAttribute('href', 'mailto:info@catalystneuro.com')
    expect(emailLink).toHaveAttribute('target', '_blank')
    expect(emailLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders newsletter subscription form', () => {
    render(<Contact />)
    
    expect(screen.getByText('Stay Updated with Our Newsletter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })

  it('handles successful newsletter subscription', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Subscribed successfully' })
    })

    render(<Contact />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: 'Subscribe' })

    await userEvent.type(emailInput, 'test@example.com')
    fireEvent.click(submitButton)

    // Check loading state
    expect(screen.getByRole('button', { name: 'Subscribing...' })).toBeInTheDocument()

    // Check success message
    await waitFor(() => {
      expect(screen.getByText(/Thanks for subscribing!/)).toBeInTheDocument()
    })
  })

  it('handles subscription error', async () => {
    const errorMessage = 'Failed to subscribe'
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: errorMessage })
    })

    render(<Contact />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: 'Subscribe' })

    await userEvent.type(emailInput, 'test@example.com')
    fireEvent.click(submitButton)

    // Check error message
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('validates email input', async () => {
    render(<Contact />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: 'Subscribe' })

    // Try submitting without email
    fireEvent.click(submitButton)
    expect(emailInput.validity.valid).toBe(false)

    // Try invalid email
    await userEvent.type(emailInput, 'invalid-email')
    fireEvent.click(submitButton)
    expect(emailInput.validity.valid).toBe(false)

    // Try valid email
    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'test@example.com')
    expect(emailInput.validity.valid).toBe(true)
  })

  it('disables form during submission', async () => {
    mockFetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)))

    render(<Contact />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: 'Subscribe' })

    await userEvent.type(emailInput, 'test@example.com')
    fireEvent.click(submitButton)

    expect(emailInput).toBeDisabled()
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Subscribing...')
  })
})
