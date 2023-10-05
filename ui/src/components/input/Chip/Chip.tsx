import { FC, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import icons from '@icons'
import { Button } from '@components/input'

import type { ChipProps } from './Chip.types'

export const Chip: FC<ChipProps> = memo(({ text, clasName, onClose }) => {
  return (
    <main
      className={twMerge(
        'flex items-center justify-center py-1 px-3 text-xs rounded-full cursor-default gap-1',
        'bg-black/5 dark:bg-dark-white/5 text-black dark:text-dark-white shadow-md',
        clasName,
      )}
    >
      <span>{text}</span>
      {onClose && (
        <Button
          Icon={icons.Close}
          circle
          className="p-0.5"
          iconSize={12}
          onClick={onClose}
        />
      )}
    </main>
  )
})
