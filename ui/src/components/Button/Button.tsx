import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import type { ButtonProps } from './Button.types'

const Button: FC<ButtonProps> = ({
  type = 'default',
  className,
  onClick,
  text,
  iconPosition,
  Icon,
  iconSize = 16,
  to,
  withHover = true,
  circle = false,
  uppercase = false,
  iconFill,
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
        withHover ? 'hover:bg-black/20 dark:hover:bg-white/20' : '',
        circle ? 'rounded-full' : 'rounded-lg',
        uppercase ? 'uppercase' : '',
        className,
      )}
    >
      {Icon && (!iconPosition || iconPosition === 'left') && (
        <Icon width={iconSize} height={iconSize} fill={iconFill} />
      )}
      {text}
      {Icon && iconPosition === 'right' && (
        <Icon width={iconSize} height={iconSize} fill={iconFill} />
      )}
    </Wrapper>
  )
}

export default Button
