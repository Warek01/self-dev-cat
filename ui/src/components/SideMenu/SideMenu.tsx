import classNames from 'classnames'
import { FC, memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import icons from '../../icons'
import { AppRoute } from '../../lib/constants/enums/AppRoute.ts'
import { authorLinks } from '../../lib/constants/links/authorLinks.ts'
import { headerLinks } from '../../lib/constants/links/headerLinks.ts'
import { useAppDispatch } from '../../lib/hooks/useAppDispatch.ts'
import { useAppSelector } from '../../lib/hooks/useAppSelector.ts'
import { signOut } from '../../lib/slices/currentUser/currentUser.slice.ts'
import { setSideMenuOpened } from '../../lib/slices/layout/layout.slice.ts'
import { IconLink } from '../index.ts'
import { disabledForPaths } from './SideMenu.constants.ts'

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
        'bg-white dark:bg-dark-black border-l border-black/20 flex flex-col items-center py-6',
        {
          'translate-x-full pointer-events-none': !isSideMenuOpened,
        },
      )}
    >
      <div className="flex w-full pr-12 pb-16 justify-end">
        <button onClick={handleClose} className="p-2 rounded-full">
          <icons.Close
            width={32}
            height={32}
            className="fill-black dark:fill-dark-white"
          />
        </button>
      </div>
      <ul className="flex flex-col items-center gap-8 text-2xl">
        {headerLinks.map((link, index) => (
          <Link to={link.href} key={index}>
            {link.text}
          </Link>
        ))}
      </ul>
      <ul className="py-8">
        <button
          className="flex gap-2 items-center justify-center p-2 rounded-lg"
          onClick={handleLogout}
        >
          Log Out
          <icons.Logout width={16} height={16} />
        </button>
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
