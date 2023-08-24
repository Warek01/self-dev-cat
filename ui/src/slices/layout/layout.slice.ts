import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReactElement } from 'react'

import type { RootState } from '@constants/store'
import type { LayoutSliceProps } from './layout.slice.types'
import { localStorageHelper } from '@helpers/localStorageHelper'

const initialState: LayoutSliceProps = {
  isSideMenuOpened: false,
  isMobile: false,
  theme: localStorageHelper.theme,
  modalWindowElement: null,
  isModalWindowOpened: false,
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
    openModal: (state, action: PayloadAction<ReactElement | null>) => {
      state.modalWindowElement = action.payload
      state.isModalWindowOpened = true
    },
    closeModal: (state) => {
      state.modalWindowElement = null
      state.isModalWindowOpened = false
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
