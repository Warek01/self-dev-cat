import { FormikHelpers } from 'formik'
import { FC, memo, useCallback } from 'react'
import { toast } from 'react-toastify'

import { LoginForm } from '@components'
import { LoginValues } from '@components/LoginForm/LoginForm.types'
import { login } from '@auth'
import { loginSchema } from '@validation-schemas'

export const LoginContainer: FC = memo(() => {
  const handleLogin = useCallback(
    async (values: LoginValues, formikHelpers: FormikHelpers<LoginValues>) => {
      const { error, unauthorized } = await login(values)
      if (error) {
        toast('Login failed', { type: 'error' })
      }

      if (unauthorized) {
        toast('Wrong username or password', { type: 'error' })
      }
    },
    [],
  )

  // useGlobalListener('keydown', (event: KeyboardEvent) => {
  //   if (
  //     event.key === 'Enter' &&
  //     (document.activeElement === loginRefs.username.current ||
  //       document.activeElement === loginRefs.password.current)
  //   ) {
  //     handleLogin()
  //   }
  // })

  return (
    <LoginForm
      validationSchema={loginSchema}
      onSubmit={handleLogin}
      initialValues={{ username: '', password: '' }}
    />
  )
})
