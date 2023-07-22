import { createSlice } from '@reduxjs/toolkit'

import type { ChatSliceProps } from './chat.slice.types'

const initialState: ChatSliceProps = {}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
})

export const {} = chatSlice.actions
export default chatSlice.reducer
