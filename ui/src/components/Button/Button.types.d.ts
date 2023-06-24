import { MouseEventHandler } from 'react';

export type ButtonType = 'default' | 'link';

export interface ButtonProps {
  type?: ButtonType
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  Icon?: IconComponent
  text?: string
  iconPosition?: 'left' | 'right'
  iconFill?: string
  iconSize?: number
  to?: string
  withHover?: boolean
  circle?: boolean
  uppercase?: boolean
}