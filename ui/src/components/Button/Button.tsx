import { Wrapper } from '@storybook/blocks'
import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import type { ButtonProps } from './Button.types'

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  text,
  iconPosition,
  Icon,
  to,
  iconClassName,
  type = 'default',
  iconSize = 16,
  withHover = true,
  circle = false,
  uppercase = false,
  disabled = false,
}) => {
  const Wrapper: FC<PropsWithChildren<any>> = ({ children, ...props }) =>
    type === 'default' ? (
      <button {...props}>{children}</button>
    ) : (
      <Link {...props} to={to}>
        {children}
      </Link>
    )

  return (
    <Wrapper
      onClick={onClick}
      className={twMerge(
        `duration-150 flex justify-center gap-2 items-center p-2 cursor-pointer whitespace-nowrap text-ellipsis 
        overflow-hidden`,
        withHover && 'hover:bg-black/20 dark:hover:bg-white/20',
        circle ? 'rounded-full' : 'rounded-lg',
        uppercase && 'uppercase',
        disabled && 'pointer-events-none',
        className,
      )}
    >
      {Icon && (!iconPosition || iconPosition === 'left') && (
        <Icon
          width={iconSize}
          height={iconSize}
          className={twMerge(
            disabled && 'fill-disabled dark:fill-disabled',
            iconClassName,
          )}
        />
      )}
      {text}
      {Icon && iconPosition === 'right' && (
        <Icon
          width={iconSize}
          height={iconSize}
          className={twMerge(
            disabled && 'fill-disabled dark:fill-disabled',
            iconClassName,
          )}
        />
      )}
    </Wrapper>
  )
}

export default Button
