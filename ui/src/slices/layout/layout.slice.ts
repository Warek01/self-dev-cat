import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { OpenedModalWindow } from "@enums";
import type { RootState } from '@constants/store'
import type { LayoutSliceProps } from './layout.slice.types'

const initialState: LayoutSliceProps = {
  isSideMenuOpened: false,
  isMobile: false,
  theme: (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
  openedModalWindow: null,
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSideMenuOpened: (state, action: PayloadAction<boolean>) => {
      state.isSideMenuOpened = action.payload
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
    openModal: (state, action: PayloadAction<OpenedModalWindow | null>) => {
      state.openedModalWindow = action.payload
    },
    closeModal: (state) => {
      state.openedModalWindow = null
    },
  },
})

export const {
  toggleTheme,
  setSideMenuOpened,
  setIsMobile,
  openModal,
  closeModal,
} = layoutSlice.actions
export default layoutSlice.reducer

export const selectTheme = (state: RootState) => state.layout.theme
