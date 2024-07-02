import { FC, memo, PropsWithChildren } from 'react'

import type { HProps } from './H.types'
import { cn } from '@helpers'

export const H: FC<PropsWithChildren<HProps>> = memo((props) => {
  const { type, children, className } = props

  return (
    <p
      className={cn(
        'flex',
        ['text-4xl', 'text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base'][
          type
        ],
        className,
      )}
    >
      {children}
    </p>
  )
})
