import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../stores/store'

import type { LayoutSliceProps } from './layout.slice.types'

const initialState: LayoutSliceProps = {
  isSideMenuOpened: false,
  isMobile: false,
  theme: (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
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
  },
})

export const { toggleTheme, setSideMenuOpened, setIsMobile } =
  layoutSlice.actions
export default layoutSlice.reducer

export const selectTheme = (state: RootState) => state.layout.theme
