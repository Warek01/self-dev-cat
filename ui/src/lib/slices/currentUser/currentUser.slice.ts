import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { currentUserClient } from '../../clients/currentUserClient.ts'
import { FetchStatus } from '../../constants/enums/FetchStatus.ts'
import { RootState } from '../../stores/store.ts'

import type { CurrentUserSliceProps } from './currentUser.slice.types'

export const fetchCurrentUser = createAsyncThunk(
  'currentUser/fetchData',
  async (accessToken: string) => {
    return currentUserClient.getData(accessToken)
  },
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.status = FetchStatus.PENDING
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = FetchStatus.REJECTED
        state.error = action.error
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = FetchStatus.FULFILLED
        if (action.payload) {
          state.user = action.payload
        } else {
          state.status = FetchStatus.ERROR
        }
      })
  },
})

export const { signOut } = currentUserSlice.actions
export default currentUserSlice.reducer

export const selectAccessToken = (state: RootState) => state.user.accessToken
export const selectCurrentUser = (state: RootState) => state.user
