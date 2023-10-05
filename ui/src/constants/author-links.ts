import icons from '@icons'
import { repeat } from '@helpers'
import type { IconLink } from '@/types/IconLink'

// TODO: change to actual links
export const authorLinks: IconLink[] = repeat<IconLink>(
  {
    href: '#',
    alt: '',
    Icon: icons.Instagram,
  },
  6,
)
