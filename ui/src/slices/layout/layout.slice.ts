import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@constants/store'
import type { LayoutSliceProps } from './layout.slice.types'
import { localStorageHelper } from '@helpers/localStorageHelper'

const initialState: LayoutSliceProps = {
  isSideMenuOpened: false,
  isMobile: false,
  theme: localStorageHelper.theme,
  isChatSelectCollapsed: localStorageHelper.isChatSelectCollapsed,
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
