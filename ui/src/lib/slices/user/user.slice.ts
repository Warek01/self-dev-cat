import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ajax } from 'rxjs/ajax'
import { userMock } from '../../__mocks__/user.mock.ts'
import { AppDispatch, RootState, store } from '../../stores/store.ts'
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
  return async (
    dispatch: AppDispatch,
    getState: typeof store.getState,
  ): Promise<void> => {
    ajax<User>({
      url: `http://localhost:3000/user`,
      method: 'GET',
      headers: {
        'Authentication': `Bearer ${accessToken}`,
      },
    }).subscribe({
      next: (data) => {
        dispatch(setUser(data.response))
      },
      complete: () => {
        dispatch(setLoadingState(false))
        console.log('user load complete')
      },
      error: (err) => {
        console.error(err)
      },
    })


    ajax<User>({
      url: `http://localhost:3000/user/login`,
      method: 'GET',
      user: 'warek',
      password: 'warek'
    }).subscribe({
      next: (data) => {
        console.log(data)
        // dispatch(setUser(data.response))
      },
      complete: () => {
        // dispatch(setLoadingState(false))
        console.log('user patch(setUser(data.response))load complete')
      },
      error: (err) => {
        console.error(err)
      },
    })
  }
}
