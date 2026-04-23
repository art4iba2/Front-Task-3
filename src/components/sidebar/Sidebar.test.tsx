import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sidebar from './Sidebar'
import { ChatContext } from '../../app/providers/ChatProvider'
import type { ChatState } from '../types/message'

function renderSidebar(state: ChatState, dispatch = jest.fn()) {
  return render(
    <ChatContext.Provider value={{ state, dispatch }}>
      <Sidebar open={true} navigate={jest.fn()} />
    </ChatContext.Provider>
  )
}

describe('Sidebar', () => {
  const baseState: ChatState = {
    chats: [
      { id: '1', title: 'Рабочий чат', messages: [] },
      { id: '2', title: 'Личный чат', messages: [] },
    ],
    activeChatId: '1',
    isLoading: false,
  }

  it('filters chats by search query', async () => {
        renderSidebar(baseState)

    await userEvent.type(screen.getByPlaceholderText('Поиск...'), 'Личный')

    expect(screen.queryByText('Рабочий чат')).not.toBeInTheDocument()
    expect(screen.getByText('Личный чат')).toBeInTheDocument()
  })

  it('shows all chats for empty search query', async () => {
        renderSidebar(baseState)

    const input = screen.getByPlaceholderText('Поиск...')
    await userEvent.type(input, 'Рабочий')
    await userEvent.clear(input)

    expect(screen.getByText('Рабочий чат')).toBeInTheDocument()
    expect(screen.getByText('Личный чат')).toBeInTheDocument()
  })

  it('asks for confirmation when delete button is clicked', async () => {
        const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false)

    renderSidebar(baseState)

    const deleteButtons = screen.getAllByRole('button', { name: '🗑' })
    await userEvent.click(deleteButtons[0])

    expect(confirmSpy).toHaveBeenCalledWith('Удалить чат?')
    confirmSpy.mockRestore()
  })
})
