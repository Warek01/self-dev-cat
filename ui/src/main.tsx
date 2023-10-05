import { StrictMode } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { pagesConfig } from '@constants/pages-config'
import { store } from '@/redux/store'
import '@styles/index.sass'

const router = createBrowserRouter(pagesConfig)
const rootElement: HTMLElement = document.getElementById('root')!
const appRoot: Root = createRoot(rootElement)

appRoot.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>,
)
