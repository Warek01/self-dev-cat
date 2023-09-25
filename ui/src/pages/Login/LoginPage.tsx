import { FC, memo } from 'react'

import { LoginForm } from "@components/forms";

const LoginPage: FC = () => {
  return (
    <main className="flex-1 flex items-center justify-center">
      <LoginForm />
    </main>
  )
}

export default memo(LoginPage)
