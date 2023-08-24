import { FC, memo, PropsWithChildren, useRef, useState } from 'react'
import classNames from 'classnames'

import { useSkipFirstRender } from '@hooks'
import type { AnimateProps } from './Animate.types'
import { animationMap, durationMap } from './Animate.constants'

export const Animate: FC<PropsWithChildren<AnimateProps>> = memo(
  ({ show, children, duration = 150, animation = 'fade & scale' }) => {
    const [innerShow, setInnerShow] = useState(false)
    const timeoutRef = useRef<number>()

    useSkipFirstRender(
      () => {
        clearTimeout(timeoutRef.current)

        if (show) {
          setInnerShow(true)
        } else {
          timeoutRef.current = setTimeout(() => setInnerShow(false), duration)
        }
      },
      [show],
      () => {
        clearTimeout(timeoutRef.current)
      },
    )

    return (
      <div
        className={classNames(
          durationMap[duration],
          'transform-gpu',
          show ? animationMap[animation].end : animationMap[animation].start,
        )}
      >
        {innerShow && children}
      </div>
    )
  },
)
