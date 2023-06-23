import classNames from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { IconLinkProps } from './IconLink.types'

const IconLink: FC<IconLinkProps> = ({ Icon, size, href, className }) => {
  return (
    <Link to={href} className={classNames('p-1 group', className)}>
      <Icon
        width={size}
        height={size}
        className="group-hover:fill-black/70 dark:group-hover:fill-dark-white/70 fill-black dark:fill-dark-white"
      />
    </Link>
  )
}

export default IconLink
