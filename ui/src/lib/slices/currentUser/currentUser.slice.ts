import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FetchStatus } from '../../enums/FetchStatus.ts'
import type { RootState } from '../../stores/store.ts'
import { User } from '../../types/User.ts'
import type { CurrentUserSliceProps } from './currentUser.slice.types'

const initialState: CurrentUserSliceProps = {
  user: null,
  status: FetchStatus.IDLE,
  accessToken: localStorage.getItem('access_token') ?? null,
  error: null,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem('access_token')

      return {
        ...state,
        error: null,
        user: null,
        accessToken: null,
        status: FetchStatus.IDLE,
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      const token = action.payload

      state.accessToken = token
      token
        ? localStorage.setItem('access_token', token)
        : localStorage.removeItem('access_token')
    },
    setStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.status = action.payload
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
})

export const { signOut, setToken, setStatus, setUser } =
  currentUserSlice.actions
export default currentUserSlice.reducer

export const selectAccessToken = (state: RootState) => state.user.accessToken
export const selectCurrentUser = (state: RootState) => state.user
