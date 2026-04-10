import React from 'react'
import { reducer, initialState, ChatProvider, ChatContext } from './ChatProvider'
import { render, screen, fireEvent } from '@testing-library/react'
import { loadState, saveState } from '../../utils/storage'
import type { ChatState } from '../../components/types/message'

jest.mock('../../utils/storage', () => ({
  loadState: jest.fn(),
  saveState: jest.fn(),
}))

describe('chat reducer', () => {
  it('ADD_MESSAGE adds message to the end of chat messages', () => {
    const state: ChatState = {
      chats: [
        {
          id: 'chat-1',
          title: 'Chat 1',
          messages: [
            { id: 'm1', role: 'user', content: 'first', timestamp: '2026-01-01' },
          ],
        },
      ],
      activeChatId: 'chat-1',
      isLoading: false,
    }

    const next = reducer(state, {
      type: 'ADD_MESSAGE',
      payload: {
        chatId: 'chat-1',
        message: { id: 'm2', role: 'assistant', content: 'second', timestamp: '2026-01-02' },
      },
    })

    expect(next.chats[0].messages).toHaveLength(2)
    expect(next.chats[0].messages[1].content).toBe('second')
  })

  it('CREATE_CHAT creates chat with unique id and appends to chats', () => {
    jest.spyOn(Date, 'now').mockReturnValue(123456)

    const next = reducer(initialState, { type: 'CREATE_CHAT' })

    expect(next.chats).toHaveLength(1)
    expect(next.chats[0].id).toBe('123456')
    expect(next.activeChatId).toBe('123456')

    ;(Date.now as jest.Mock).mockRestore()
  })

  it('DELETE_CHAT removes chat and resets activeChatId when active chat is deleted', () => {
    const state: ChatState = {
      chats: [
        { id: 'a', title: 'A', messages: [] },
        { id: 'b', title: 'B', messages: [] },
      ],
      activeChatId: 'b',
      isLoading: false,
    }

    const next = reducer(state, { type: 'DELETE_CHAT', payload: 'b' })

    expect(next.chats.map((chat) => chat.id)).toEqual(['a'])
    expect(next.activeChatId).toBe('a')
  })

  it('RENAME_CHAT updates title by chat id', () => {
    const state: ChatState = {
      chats: [{ id: 'a', title: 'Old title', messages: [] }],
      activeChatId: 'a',
      isLoading: false,
    }

    const next = reducer(state, {
      type: 'RENAME_CHAT',
      payload: { id: 'a', title: 'New title' },
    })

    expect(next.chats[0].title).toBe('New title')
  })
})

describe('ChatProvider persistence', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('restores state from localStorage on initialization', () => {
    const persistedState: ChatState = {
      chats: [{ id: 'x', title: 'Recovered', messages: [] }],
      activeChatId: 'x',
      isLoading: false,
    }

    ;(loadState as jest.Mock).mockReturnValue(persistedState)

    function Probe() {
      const ctx = React.useContext(ChatContext)
      return <div>{ctx?.state.chats[0]?.title}</div>
    }

    render(
      <ChatProvider>
        <Probe />
      </ChatProvider>
    )

    expect(screen.getByText('Recovered')).toBeInTheDocument()
  })

  it('saves state to localStorage when state changes', () => {
    ;(loadState as jest.Mock).mockReturnValue(initialState)

    function Probe() {
      const ctx = React.useContext(ChatContext)!
      return <button onClick={() => ctx.dispatch({ type: 'CREATE_CHAT' })}>create</button>
    }

    render(
      <ChatProvider>
        <Probe />
      </ChatProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'create' }))

    expect(saveState).toHaveBeenCalled()
    expect((saveState as jest.Mock).mock.calls.at(-1)?.[0].chats).toHaveLength(1)
  })
})
