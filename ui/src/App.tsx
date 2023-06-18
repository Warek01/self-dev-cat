import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { pagesConfig } from './lib/constants/pages/pagesConfig.tsx'
import { store } from './lib/stores/store.ts'

const App: FC = () => {
  const router = createBrowserRouter(pagesConfig)

  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  )
}

export default App
