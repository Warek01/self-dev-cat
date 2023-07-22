import { FC, memo, PropsWithChildren, useEffect, useState } from 'react'

import type { FadeProps } from './Fade.types'

const Fade: FC<PropsWithChildren<FadeProps>> = ({
  children,
  fadeInDuration = 250,
}) => {
  const [shown, setShown] = useState<boolean>(false)

  useEffect(() => {
    setShown(true)
  }, [])

  return (
    <main
      style={{ transitionDuration: `${fadeInDuration}ms` }}
      className={shown ? 'opacity-100' : 'opacity-0'}
    >
      {children}
    </main>
  )
}

export default memo(Fade)
