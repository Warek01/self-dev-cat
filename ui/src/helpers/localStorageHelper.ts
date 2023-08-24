import type {Theme} from '@/types/Theme'

export interface LocalStorageItems {
  remove: (key: keyof Omit<LocalStorageItems, 'remove'>) => void
  theme: Theme
  isChatSelectCollapsed: boolean
  accessToken: string | null
}

const keyMap: Record<keyof Omit<LocalStorageItems, 'remove'>, string> = {
  accessToken: 'access_token',
  theme: 'theme',
  isChatSelectCollapsed: 'is_chat_menu_collapsed'
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
    return get<typeof this.accessToken>('access_token', null)
  },
  set accessToken(value) {
    set('access_token', value)
  },

  get theme() {
    return get<typeof this.theme>('theme', 'light')
  },
  set theme(value) {
    set('theme', value)
  },

  get isChatSelectCollapsed() {
    return get<typeof this.isChatSelectCollapsed>(
      'is_chat_select_collapsed',
      false,
    )
  },
  set isChatSelectCollapsed(value) {
    set('is_chat_select_collapsed', value)
  },
}
