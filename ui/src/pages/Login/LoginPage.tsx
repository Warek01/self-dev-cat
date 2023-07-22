import { FC, memo } from 'react'

import { LoginContainer } from '@containers'

const LoginPage: FC = () => {
  return (
    <main className="flex-1 flex items-center justify-center">
      <LoginContainer />
    </main>
  )
}

export default memo(LoginPage)
