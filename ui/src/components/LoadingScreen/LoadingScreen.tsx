import { FC } from 'react'

import { Backdrop } from '../index'
import icons from '../../icons'

const LoadingScreen: FC = () => {
  return (
    <Backdrop>
      <icons.Spinner width={48} height={48} className="animate-spin" />
    </Backdrop>
  )
}

export default LoadingScreen
