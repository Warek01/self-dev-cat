import { FC } from 'react'
import { useLocation } from 'react-router-dom'

import icons from '../../icons'
import { Button } from '../../components'
import { AppRoute } from '../../lib/enums/AppRoute'
import { Color } from '../../lib/enums/Color'

const NotFoundPage: FC = () => {
  const location = useLocation()

  return (
    <main className="flex-1 gap-12 flex justify-center items-center flex-col">
      <h1 className="text-2xl">
        Location <span className="text-red-600 mx-2">{location.pathname}</span>{' '}
        not found
      </h1>
      <Button
        Icon={icons.ArrowLeft}
        text="Go home"
        to={AppRoute.HOME}
        type="link"
        iconSize={20}
        iconPosition="left"
        uppercase
        iconFill={Color.LinkBlue}
      />
    </main>
  )
}

export default NotFoundPage
