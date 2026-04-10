import { render, screen } from '@testing-library/react'
import Message from './Message'

describe('Message', () => {
  it('renders user message with user css class', () => {
    render(<Message role='user' content='User text' />)

    expect(screen.getByText('User text')).toBeInTheDocument()
    expect(screen.getByText('User text').closest('.message')).toHaveClass('user')
  })

  it('renders assistant message with assistant css class', () => {
    render(<Message role='assistant' content='Assistant text' />)

    expect(screen.getByText('Assistant text')).toBeInTheDocument()
    expect(screen.getByText('Assistant text').closest('.message')).toHaveClass('assistant')
  })

  it('shows copy button only for assistant variant', () => {
    const { rerender } = render(<Message role='assistant' content='Assistant text' />)

    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Message role='user' content='User text' />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
