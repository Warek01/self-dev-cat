import { FC, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { getAccessToken, mapRouteParams } from '@helpers'
import icons from '@icons'
import { unprotectedPages } from '@constants/pages/unprotectedPages'
import { selectTheme, setSideMenuOpened, toggleTheme } from '@slices'
import { AppRoute } from '@enums'
import { useAppDispatch, useAppSelector } from '@hooks'
import { Button } from '@components'
import { useGetCurrentUserQuery } from '@apis'

export const Header: FC = memo(() => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const isUnprotectedLocation = unprotectedPages.includes(location.pathname)

  const user = useGetCurrentUserQuery(null, {
    skip: !getAccessToken(),
  })
  const theme = useAppSelector(selectTheme)

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
          to={mapRouteParams(AppRoute.USER, { username: user.data?.username! })}
          Icon={icons.User}
          iconSize={24}
          disabled={isUnprotectedLocation && !user.data}
        />
        <Button
          type="link"
          to={AppRoute.CHAT}
          Icon={icons.Message}
          iconSize={24}
          disabled={isUnprotectedLocation && !user.data}
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
