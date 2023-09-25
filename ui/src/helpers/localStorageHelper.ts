import type { Theme } from '@/types/Theme'

export interface LocalStorageItems {
  remove: (key: keyof Omit<LocalStorageItems, 'remove'>) => void
  theme: Theme
  isChatMenuCollapsed: boolean
  accessToken: string | null
}

const keyMap: Record<keyof Omit<LocalStorageItems, 'remove'>, string> = {
  accessToken: 'accessToken',
  theme: 'theme',
  isChatMenuCollapsed: 'chatMenuCollapsed',
}

export const get = <T>(
  key: string,
  defaultValue: T,
  shouldParse: boolean = false,
): T => {
  const item = localStorage.getItem(key)!
  if (shouldParse) {
    try {
      return JSON.parse(item) as T
    } catch {
      return defaultValue
    }
  } else {
    return item as T
  }
}

export const set = (key: string, value: any) => localStorage.setItem(key, value)
export const rm = (key: string) => localStorage.removeItem(key)

export const localStorageHelper: LocalStorageItems = {
  remove: (key) => rm(keyMap[key]),

  get accessToken() {
    return get<typeof this.accessToken>('accessToken', null)
  },
  set accessToken(value) {
    set('accessToken', value)
  },

  get theme() {
    return get<typeof this.theme>('theme', 'light')
  },
  set theme(value) {
    set('theme', value)
  },

  get isChatMenuCollapsed() {
    return get<typeof this.isChatMenuCollapsed>('chatMenuCollapsed', false)
  },
  set isChatMenuCollapsed(value) {
    set('chatMenuCollapsed', value)
  },
}
