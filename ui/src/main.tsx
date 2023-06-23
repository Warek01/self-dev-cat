import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { pagesConfig } from './lib/constants/pages/pagesConfig.tsx'
import { store } from './lib/stores/store.ts'

import './styles/index.sass'

const router = createBrowserRouter(pagesConfig)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>,
)
