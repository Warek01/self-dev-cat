import { FC, memo } from 'react'

import RegisterForm from '../../forms/RegisterForm/RegisterForm.tsx'

const RegisterPage: FC = () => {
  return (
    <main className="flex flex-1 items-center justify-center">
      <RegisterForm />
    </main>
  )
}

export default memo(RegisterPage)
