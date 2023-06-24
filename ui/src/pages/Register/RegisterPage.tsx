import { FC, memo } from 'react'

import RegisterForm from '../../forms/RegisterForm/RegisterForm.tsx'

const RegisterPage: FC = () => {
  return (
    <main>
      <RegisterForm />
    </main>
  )
}

export default memo(RegisterPage)
