import { MouseEventHandler } from 'react'

export type ButtonType = 'default' | 'link'

export interface ButtonProps {
  type?: ButtonType
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  Icon?: IconComponent
  text?: string
  iconPosition?: 'left' | 'right'
  iconSize?: number
  to?: string | number
  withHover?: boolean
  circle?: boolean
  uppercase?: boolean
  disabled?: boolean
  iconClassName?: string
  submit?: boolean
  active?: boolean
}
