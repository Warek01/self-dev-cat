import { FC, memo } from 'react'

import { Backdrop } from '@components/utility'
import icons from '@icons'

export const LoadingScreen: FC = memo(() => {
  return (
    <Backdrop>
      <icons.Spinner width={48} height={48} className="animate-spin" />
    </Backdrop>
  )
})
