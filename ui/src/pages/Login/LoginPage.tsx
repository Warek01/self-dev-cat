import { FC, memo } from 'react'

import LoginForm from '../../forms/LoginForm/LoginForm.tsx';

const LoginPage: FC = () => {
  return <main>
    <LoginForm />
  </main>
}

export default memo(LoginPage)
