import { FC, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import theme from 'tailwindcss/defaultTheme'

import icons from '../../icons'
import { AppRoute } from '../../lib/constants/enums/AppRoute.ts'
import { useAppDispatch } from '../../lib/hooks/useAppDispatch.ts'
import { useAppSelector } from '../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../lib/slices/currentUser/currentUser.slice.ts'
import { setSideMenuOpened } from '../../lib/slices/layout/layout.slice.ts'
import { disabledForPaths } from '../SideMenu/SideMenu.constants.ts'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const { user } = useAppSelector(selectCurrentUser)

  const handleMenuOpen = () => {
    dispatch(setSideMenuOpened(true))
  }

  if (disabledForPaths.includes(location.pathname)) {
    return null
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
        <Link
          to={`${AppRoute.USERS}/${user?.username}`}
          className="button p-2 rounded-lg"
        >
          <icons.User width={25} height={25} />
        </Link>
        <button onClick={() => theme.toggle()} className="p-2 rounded-lg">
          {theme.isDark ? (
            <icons.Moon width={25} height={25} />
          ) : (
            <icons.Sun width={25} height={25} />
          )}
        </button>
        <button onClick={handleMenuOpen} className="p-2 rounded-lg">
          <icons.Menu width={25} height={25} />
        </button>
        {/*// <ul className="flex flex-row gap-12 text-17">*/}
        {/*// {headerLinks.map((link) => (*/}
        {/*//     <Link href={link.href} key={link.text}>*/}
        {/*//       {link.text}*/}
        {/*//     </Link>*/}
        {/*//   ))}*/}
        {/*// </ul>*/}
      </div>
    </header>
  )
}

export default memo(Header)
