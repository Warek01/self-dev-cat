import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { pagesConfig } from '@constants/pages/pagesConfig'
import { store } from '@constants/store'
import '@styles/index.sass'

const theme = store.getState().layout.theme

theme === 'dark'
  ? document.body.classList.add('dark')
  : document.body.classList.remove('dark')

const router = createBrowserRouter(pagesConfig)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>,
)
