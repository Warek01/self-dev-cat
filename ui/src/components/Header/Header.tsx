import { FC, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import icons from '../../icons'
import { unprotectedPages } from '../../lib/constants/pages/unprotectedPages.ts'
import { AppRoute } from '../../lib/enums/AppRoute.ts'
import { useAppDispatch } from '../../lib/hooks/useAppDispatch.ts'
import { useAppSelector } from '../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../lib/slices/currentUser/currentUser.slice.ts'
import {
  selectTheme,
  setSideMenuOpened,
  toggleTheme,
} from '../../lib/slices/layout/layout.slice.ts'
import { Button } from '../index.ts'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const isUnprotectedLocation = unprotectedPages.includes(location.pathname)

  const { user } = useAppSelector(selectCurrentUser)
  const theme = useAppSelector(selectTheme)

  const handleMenuOpen = () => {
    dispatch(setSideMenuOpened(true))
  }

  return (
    <header className="flex justify-between py-6 max-h-20">
      <Link
        to={AppRoute.HOME}
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
          to={`${AppRoute.USERS}/${user?.username}`}
          Icon={icons.User}
          iconSize={24}
          disabled={isUnprotectedLocation}
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
}

export default memo(Header)
