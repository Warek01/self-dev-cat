import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { localStorageHelper } from '@helpers/localStorageHelper'
import { Theme } from "@/types/Theme";

export interface LayoutSliceProps {
  theme: Theme
  isSideMenuOpened: boolean
  isChatSelectCollapsed: boolean
  isMobile: boolean
}

const initialState: LayoutSliceProps = {
  isSideMenuOpened: false,
  isMobile: false,
  theme: localStorageHelper.theme,
  isChatSelectCollapsed: localStorageHelper.isChatMenuCollapsed,
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
      localStorageHelper.theme = state.theme
    },
  },
})

export const { toggleTheme, setSideMenuOpened, setIsMobile } =
  layoutSlice.actions
export default layoutSlice.reducer

export const selectTheme = (state: RootState) => state.layout.theme
