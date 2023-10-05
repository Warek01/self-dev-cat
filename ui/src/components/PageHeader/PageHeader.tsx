import { FC, memo } from 'react'

import { cl } from '@helpers'

import type { PageHeaderProps } from './PageHeader.types'

export const PageHeader: FC<PageHeaderProps> = memo(({ text, className }) => {
  return (
    <h1 className={cl('text-3xl text-heading-green font-medium', className)}>
      {text}
    </h1>
  )
})
