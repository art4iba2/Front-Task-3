import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputArea from './InputArea'

describe('InputArea', () => {
  it('calls onSend with text on send button click', async () => {
        const onSend = jest.fn()

    render(<InputArea onSend={onSend} isLoading={false} />)

    await userEvent.type(screen.getByPlaceholderText('Введите сообщение...'), 'Привет')
    await userEvent.click(screen.getByRole('button', { name: 'Отправить' }))

    expect(onSend).toHaveBeenCalledWith('Привет')
  })

  it('calls onSend on Enter with non-empty input', async () => {
        const onSend = jest.fn()

    render(<InputArea onSend={onSend} isLoading={false} />)

    await userEvent.type(screen.getByPlaceholderText('Введите сообщение...'), 'Тест{enter}')

    expect(onSend).toHaveBeenCalledWith('Тест')
  })

  it('disables send button for empty input', () => {
    render(<InputArea onSend={jest.fn()} isLoading={false} />)

    expect(screen.getByRole('button', { name: 'Отправить' })).toBeDisabled()
  })
})
