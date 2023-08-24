export type AnimateDuration = 75 | 100 | 150 | 200 | 300 | 500
export type AnimateType= 'fade' | 'scale' | 'fade & scale'

export interface AnimateProps {
  show: boolean
  duration?: AnimateDuration
  animation?: AnimateType
}
