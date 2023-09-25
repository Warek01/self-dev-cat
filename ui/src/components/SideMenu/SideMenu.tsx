import classNames from 'classnames'
import { FC, memo, useCallback } from 'react'
import {
  Link,
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import icons from '@icons'
import { authorLinks } from '@constants/author-links'
import { AppRoute } from '@enums'
import { useAppDispatch, useAppSelector } from '@hooks'
import { localStorageHelper } from '@helpers/localStorageHelper'
import { mapRouteParams } from '@helpers'
import type { User } from '@/types/User'
import { selectAuthenticatedUser } from '@redux/auth.slice'
import { setSideMenuOpened } from '@redux/layout.slice'
import { userApi } from '@redux/user.api'
import { Button, IconLink } from '@components/input'

import { disabledForPaths } from './SideMenu.constants'

export const SideMenu: FC = memo(() => {
  const location: Location = useLocation()
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()
  const user: User | null = useAppSelector(selectAuthenticatedUser)

  const { isSideMenuOpened } = useAppSelector((state) => state.layout)

  const handleClose = useCallback(() => {
    dispatch(setSideMenuOpened(false))
  }, [])

  const handleLogout = useCallback(() => {
    localStorageHelper.remove('accessToken')
    userApi.util.resetApiState()
    dispatch(setSideMenuOpened(false))
    navigate(AppRoute.LOGIN)
  }, [])

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
      <div className="flex flex-col items-center gap-8 text-2xl">
        <Link
          to={mapRouteParams(AppRoute.USER_FRIENDS, {
            username: user?.username || '',
          })}
        >
          Friends
        </Link>
        <Link
          to={mapRouteParams(AppRoute.USER_FRIEND_REQUESTS, {
            username: user?.username || '',
          })}
        >
          Friend requests
        </Link>
      </div>
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
})
