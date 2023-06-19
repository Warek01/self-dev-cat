import { configureStore } from '@reduxjs/toolkit'

import layoutReducer from '../slices/layout/layout.slice.ts'
import userReducer from '../slices/currentUser/currentUser.slice.ts'

const reducer = {
  layout: layoutReducer,
  user: userReducer,
}

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
