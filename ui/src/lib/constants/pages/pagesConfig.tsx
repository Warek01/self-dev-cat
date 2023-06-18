import { RouteObject } from 'react-router-dom'

import { Home } from '../../../pages'
import { Path } from './Path.ts'

export const pagesConfig: RouteObject[] = [
  {
    path: Path.HOME,
    element: <Home />,
  },
]
