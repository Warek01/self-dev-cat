import { FC } from 'react'

import { Backdrop } from '../index'
import icons from '../../icons'
import { LoadingScreenProps } from './LoadingScreen.types'

const LoadingScreen: FC<LoadingScreenProps> = ({ visible = true }) => {
  return (
    <Backdrop visible={visible}>
      <icons.Spinner width={48} height={48} className="animate-spin" />
    </Backdrop>
  )
}

export default LoadingScreen
