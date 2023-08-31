import { FC, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import type { LoadingSpinnerProps } from './LoadingSpinner.types'
import icons from '@icons'

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
