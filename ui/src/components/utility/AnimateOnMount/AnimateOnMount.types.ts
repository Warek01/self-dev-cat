import type {
  AnimateDuration,
  AnimateType,
} from '@components/utility/Animate/Animate.types'

export interface AnimateOnMountProps {
  duration?: AnimateDuration
  animation?: AnimateType
  delay?: number
}
