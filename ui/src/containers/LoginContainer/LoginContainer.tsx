import { FormikHelpers } from 'formik'
import { FC, memo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useLazyLoginQuery } from '@apis'
import { AppRoute } from '@enums'
import { AnimateOnMount, LoginForm } from '@components'
import { LoginValues } from '@components/LoginForm/LoginForm.types'
import { loginSchema } from '@validation-schemas'
import {localStorageHelper} from "@helpers/localStorageHelper";

export const LoginContainer: FC = memo(() => {
  const navigate = useNavigate()
  const [triggerLogin, login] = useLazyLoginQuery()

  const handleLogin = useCallback(
    async (values: LoginValues, formikHelpers: FormikHelpers<LoginValues>) => {
      triggerLogin(values)
      formikHelpers.resetForm()
    },
    [],
  )

  useEffect(() => {
    if (login.isError) {
      toast('Login error', { type: 'error' })
      console.error(login.error)
    } else if (login.data) {
      localStorageHelper.accessToken = login.data!.access_token
      navigate(AppRoute.ROOT)
    }
  }, [login])

  return (
    <AnimateOnMount>
      <LoginForm
        validationSchema={loginSchema}
        onSubmit={handleLogin}
        initialValues={{ username: '', password: '' }}
      />
    </AnimateOnMount>
  )
})
