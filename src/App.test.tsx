import { render, screen } from '@testing-library/react'
import App from './App'

test('renders auth form by default', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Авторизация' })).toBeInTheDocument()
})
