const STORAGE_KEY = "chat_state"

export function loadState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null

    return JSON.parse(data)
  } catch (e) {
    console.error("Ошибка загрузки state", e)
    return null
  }
}

export function saveState(state: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error("Ошибка сохранения state", e)
  }
}