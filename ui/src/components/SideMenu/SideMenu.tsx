import classNames from 'classnames'
import { FC, memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import icons from '../../icons'
import { authorLinks } from '../../lib/constants/links/authorLinks'
import { headerLinks } from '../../lib/constants/links/headerLinks'
import { AppRoute } from '../../lib/enums/AppRoute'
import { useAppDispatch } from '../../lib/hooks/useAppDispatch'
import { useAppSelector } from '../../lib/hooks/useAppSelector'
import { signOut } from '../../lib/slices/currentUser/currentUser.slice'
import { setSideMenuOpened } from '../../lib/slices/layout/layout.slice'
import { Button, IconLink } from '../index'
import { disabledForPaths } from './SideMenu.constants'

const SideMenu: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isMobile, isSideMenuOpened } = useAppSelector((state) => state.layout)

  const handleClose = () => {
    dispatch(setSideMenuOpened(false))
  }

  const handleLogout = () => {
    dispatch(signOut())
    navigate(AppRoute.LOGIN)
  }

  if (disabledForPaths.includes(location.pathname)) {
    return null
  }

  return (
    <aside
      className={classNames(
        'fixed h-full max-w-[100vw] duration-200 w-72 right-0 top-0 z-50 transform-gpu',
        'bg-white dark:bg-dark-black-lighter border-l border-black/20 flex flex-col items-center py-6',
        {
          'translate-x-full pointer-events-none': !isSideMenuOpened,
        },
      )}
    >
      <div className="flex w-full pr-12 pb-16 justify-end">
        <Button Icon={icons.Close} iconSize={32} onClick={handleClose} circle />
      </div>
      <ul className="flex flex-col items-center gap-8 text-2xl">
        {headerLinks.map((link, index) => (
          <Link to={link.href} key={index}>
            {link.text}
          </Link>
        ))}
      </ul>
      <ul className="py-8">
        <Button
          text="Log Out"
          className="flex gap-2 items-center justify-center p-2 rounded-lg"
          onClick={handleLogout}
          Icon={icons.Logout}
          iconPosition="right"
          iconSize={20}
        />
      </ul>
      <ul className="absolute bottom-12 gap-12 grid grid-cols-2 w-9/12">
        {authorLinks.map((link, index) => (
          <li
            key={index}
            className="col-span-1 flex items-center justify-center"
          >
            <IconLink Icon={link.Icon} size={32} href={link.href} />
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default memo(SideMenu)
