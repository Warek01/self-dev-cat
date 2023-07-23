import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { DefaultLayout } from '@components'

const App: FC = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default App
