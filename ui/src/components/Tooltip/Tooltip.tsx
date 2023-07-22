import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

import type { TooltipProps } from './Tooltip.types'
import { twMerge } from 'tailwind-merge'
import { TooltipArrowPosition, TooltipPosition } from './Tooltip.enums'
import NodeJs from '../../icons/NodeJs'

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  content,
  className,
  children,
  position = TooltipPosition.TOP,
  arrowPosition = TooltipArrowPosition.MIDDLE,
  popupDelay = 1000,
}) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()
  const [shown, setShown] = useState<boolean>(false)

  let positionClassName = ''

  switch (position) {
    case TooltipPosition.LEFT:
      positionClassName = 'left-0 -translate-x-[100%] top-1/2 -translate-y-1/2'
      break
    case TooltipPosition.RIGHT:
      positionClassName = 'right-0 translate-x-[100%] top-1/2 -translate-y-1/2'
      break
    case TooltipPosition.TOP:
      positionClassName = 'top-0 -translate-y-[100%] left-1/2 -translate-x-1/2'
      break
    case TooltipPosition.BOTTOM:
      positionClassName = 'top-0 translate-y-[100%] left-1/2 -translate-x-1/2'
      break
  }

  const handleMouseOver = useCallback(() => {
    if (timerId || shown) {
      return
    }

    setTimerId(
      setTimeout(() => {
        setShown(true)
      }, popupDelay),
    )
  }, [shown, timerId])

  const handleMouseOut = useCallback(() => {
    if (!timerId && !shown) {
      return
    }

    clearInterval(timerId)
    setTimerId(undefined)
    setShown(false)
  }, [shown, timerId])

  return (
    <main
      className={twMerge('relative', className)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div
        className={twMerge(
          'absolute p-1 rounded-lg transform-gpu',
          'bg-card-bg border-card-border dark:bg-dark-black-lighter dark:border-dark-white/20',
          shown ? 'z-50 opacity-100' : 'pointer-events-none opacity-0 -z-50',
          positionClassName,
        )}
      >
        {content}
      </div>

      {children}
    </main>
  )
}

export default memo(Tooltip)
