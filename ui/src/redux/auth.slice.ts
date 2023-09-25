import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'

import type { RootState } from '@/redux/store'
import type { User } from '@/types/User'
import { localStorageHelper } from '@helpers/localStorageHelper'
import type { JwtPayload } from '@/types/JwtResponse'

export interface AuthSliceProps {
  user: User | null
}

const initialState: AuthSliceProps = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      const user: JwtPayload = jwtDecode(action.payload)
      state.user = user.user
    },

    unsetUser: (state) => {
      state.user = null
    },
  },
})

export const { setUser, unsetUser } = authSlice.actions
export default authSlice.reducer

export const selectAuthenticatedUser = (state: RootState) => state.auth.user
