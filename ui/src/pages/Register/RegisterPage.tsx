import { FC, memo } from 'react'

import { RegisterForm } from '@components/forms'

const RegisterPage: FC = () => {
  return (
    <main className="flex flex-1 items-center justify-center">
      <RegisterForm />
    </main>
  )
}

export default memo(RegisterPage)
