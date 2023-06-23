import { repeat } from '../../helpers/repeat.ts'
import { TextLink } from '../../types/TextLink.ts'

export const headerLinks: TextLink[] = repeat<TextLink>(
  {
    text: '12345',
    href: '',
  },
  3,
)
