import { FC, memo, PropsWithChildren, useEffect, useState } from 'react'

import type { AnimateOnMountProps } from './AnimateOnMount.types'
import { Animate } from '@components'

export const AnimateOnMount: FC<PropsWithChildren<AnimateOnMountProps>> = memo(
  ({ animation, duration, children, delay = 150 }) => {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
      setTimeout(() => setShow(true), delay)
    }, [])

    return (
      <Animate
        show={show}
        animation={animation}
        duration={duration}
        children={children}
      />
    )
  },
)
