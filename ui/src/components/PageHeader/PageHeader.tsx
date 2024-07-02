import { FC, memo } from 'react'

import { cn } from '@helpers'

import type { PageHeaderProps } from './PageHeader.types'

export const PageHeader: FC<PageHeaderProps> = memo(({ text, className }) => {
  return (
    <h1 className={cn('text-3xl text-heading-green font-medium', className)}>
      {text}
    </h1>
  )
})
