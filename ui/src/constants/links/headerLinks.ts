import { repeat } from '../../helpers/repeat'
import { TextLink } from '../../types/TextLink'

export const headerLinks: TextLink[] = repeat<TextLink>(
  {
    text: '12345',
    href: '',
  },
  3,
)
