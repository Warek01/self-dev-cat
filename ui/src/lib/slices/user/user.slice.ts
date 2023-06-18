import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { userMock } from '../../__mocks__/user.mock.ts'
import { AppDispatch, RootState } from '../../stores/store.ts'
import { User } from '../../types/User'

import type { UserSliceProps } from './user.slice.types'

const initialState: UserSliceProps = {
  user: null,
  loading: true,
  accessToken: localStorage.getItem('access_token') ?? null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setUser, setLoadingState } = userSlice.actions
export default userSlice.reducer

export const fetchUser = (accessToken: string) => {
  return async (dispatch: AppDispatch, getState: any): Promise<void> => {
    dispatch(setUser(userMock))
    dispatch(setLoadingState(false))
  }
}
