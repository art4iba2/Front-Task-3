import { loadState, saveState } from './storage'

describe('storage', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('saves state to localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    const state = { chats: [{ id: '1' }], activeChatId: '1', isLoading: false }

    saveState(state)

    expect(setItemSpy).toHaveBeenCalledWith('chat_state', JSON.stringify(state))
  })

  it('restores state from localStorage', () => {
    const payload = JSON.stringify({ chats: [{ id: '1' }], activeChatId: '1', isLoading: false })
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(payload)

    expect(loadState()).toEqual({ chats: [{ id: '1' }], activeChatId: '1', isLoading: false })
  })

  it('returns null on invalid JSON in localStorage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('{broken')
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(loadState()).toBeNull()
    expect(errorSpy).toHaveBeenCalled()
  })
})
