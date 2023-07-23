import { createSlice } from '@reduxjs/toolkit'

import type { UsersSliceProps } from './users.slice.types'

const initialState: UsersSliceProps = {}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const {} = usersSlice.actions
export default usersSlice.reducer
