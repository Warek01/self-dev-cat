import type {
  AnimateDuration,
  AnimateType,
} from '@components/utility/Animate/Animate.types'

export const durationMap: Record<AnimateDuration, string> = {
  75: 'duration-75',
  100: 'duration-100',
  150: 'duration-150',
  200: 'duration-200',
  300: 'duration-300',
  500: 'duration-500',
}

export const animationMap: Record<
  AnimateType,
  {
    start: string
    end: string
  }
> = {
  fade: {
    start: 'opacity-0',
    end: 'opacity-100',
  },
  scale: {
    start: 'scale-0',
    end: 'scale-100',
  },
  'fade & scale': {
    start: 'opacity-0 scale-0',
    end: 'opacity-100 scale-100',
  },
}
