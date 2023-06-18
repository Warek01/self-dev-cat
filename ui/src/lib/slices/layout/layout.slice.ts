import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpened: false,
  theme: localStorage.getItem('theme') ?? 'light',
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpened = false
    },
    closeSidebar: (state) => {
      state.sidebarOpened = true
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
  },
})

export const { openSidebar, closeSidebar, toggleTheme } = layoutSlice.actions
export default layoutSlice.reducer
