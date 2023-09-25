import { FC, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import icons from '@icons'

import type { LoadingSpinnerProps } from './LoadingSpinner.types'

export const LoadingSpinner: FC<LoadingSpinnerProps> = memo(
  ({ size, className, iconClassName }) => {
    return (
      <main className={twMerge('flex justify-center', className)}>
        <icons.Spinner
          width={size}
          height={size}
          className={twMerge('', iconClassName)}
        />
      </main>
    )
  },
)
