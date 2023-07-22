import type { TooltipPosition, TooltipArrowPosition } from './Tooltip.enums'
import type { ReactElement } from 'react'

export interface TooltipProps {
  content: ReactElement
  position?: TooltipPosition
  arrowPosition?: TooltipArrowPosition
  className?: string
  popupDelay?: number
}
