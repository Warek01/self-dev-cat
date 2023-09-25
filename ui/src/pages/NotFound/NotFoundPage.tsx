import { FC } from 'react'
import { Location, useLocation } from 'react-router-dom'

import icons from '@icons'
import { Button } from '@components/input'

const NotFoundPage: FC = () => {
  const location: Location = useLocation()

  return (
    <main className="flex-1 gap-12 flex justify-center items-center flex-col">
      <h1 className="text-2xl">
        Location <span className="text-red-600 mx-2">{location.pathname}</span>{' '}
        not found
      </h1>
      <Button
        Icon={icons.ArrowLeft}
        text="Go home"
        to="/"
        type="link"
        iconSize={20}
        iconPosition="left"
        uppercase
      />
    </main>
  )
}

export default NotFoundPage
