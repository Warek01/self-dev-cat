import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import layoutReducer from '../slices/layout/layout.slice.ts'
import userReducer from '../slices/user/user.slice.ts'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const reducer = {
  layout: layoutReducer,
  user: userReducer,
}

export const store = configureStore({
  reducer,
  enhancers: [composedEnhancer],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
