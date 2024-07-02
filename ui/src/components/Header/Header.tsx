import { FC, memo } from 'react'
import { Link, useLocation, Location } from 'react-router-dom'

import { mapRouteParams } from '@helpers'
import icons from '@icons'
import { unprotectedPages } from '@constants/unprotected-pages'
import { AppRoute } from '@enums'
import { useAppDispatch, useAppSelector } from '@hooks'
import { selectAuthenticatedUser } from '@redux/auth.slice'
import {
  selectTheme,
  setSideMenuOpened,
  toggleTheme,
} from '@redux/layout.slice'
import { Button } from '@components/input'
import { Theme } from '@/types/Theme'
import type { AuthenticatedUser } from '@/types/Auth'

export const Header: FC = memo(() => {
  const dispatch = useAppDispatch()
  const location: Location = useLocation()
  const user: AuthenticatedUser | null = useAppSelector(selectAuthenticatedUser)
  const isUnprotectedLocation: boolean = unprotectedPages.includes(
    location.pathname,
  )
  const theme: Theme = useAppSelector(selectTheme)

  const handleMenuOpen = () => {
    dispatch(setSideMenuOpened(true))
  }

  return (
    <header className="flex justify-between py-6 max-h-20">
      <Link
        to={AppRoute.ROOT}
        className="flex gap-6 items-center font-semibold text-lg md:text-xl"
      >
        <img
          src="/Logo.webp"
          alt="Logo"
          width={32}
          height={32}
          draggable={false}
          placeholder="Self-Dev"
        />
        <span className="hidden md:inline-block">Self development catalog</span>
        <span className="inline-block md:hidden">Self-Dev</span>
      </Link>
      <div className="flex items-center justify-end gap-2 md:gap-6 lg:gap-12">
        <Button
          type="link"
          to={mapRouteParams(AppRoute.USER, { userId: user?.id || '' })}
          Icon={icons.User}
          iconSize={24}
          disabled={isUnprotectedLocation && !user}
        />
        <Button
          type="link"
          to={AppRoute.CHAT}
          Icon={icons.Message}
          iconSize={24}
          disabled={isUnprotectedLocation && !user}
        />
        <Button
          iconSize={24}
          Icon={theme === 'dark' ? icons.Moon : icons.Sun}
          onClick={() => dispatch(toggleTheme())}
        />
        <Button
          iconSize={24}
          Icon={icons.Menu}
          onClick={handleMenuOpen}
          disabled={isUnprotectedLocation}
        />
      </div>
    </header>
  )
})
