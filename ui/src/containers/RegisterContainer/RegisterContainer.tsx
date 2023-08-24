import { FormikHelpers } from 'formik'
import { FC, memo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AppRoute } from '@enums'
import { useRegisterUserMutation } from '@apis'
import type { LoginValues } from '@components/LoginForm/LoginForm.types'
import type { RegisterValues } from '@components/RegisterForm/RegisterForm.types'
import { registerSchema } from '@validation-schemas'
import { AnimateOnMount, RegisterForm } from '@components'
import { localStorageHelper } from '@helpers/localStorageHelper'

export const RegisterContainer: FC = memo(() => {
  const navigate = useNavigate()
  const [triggerRegister, register] = useRegisterUserMutation()

  const handleRegistration = useCallback(
    async (
      values: LoginValues,
      formikHelpers: FormikHelpers<RegisterValues>,
    ) => {
      triggerRegister({
        username: values.username,
        password: values.password,
        email: values.username,
      })
      formikHelpers.resetForm()
    },
    [],
  )
  useEffect(() => {
    if (register.isError) {
      toast('Login error', { type: 'error' })
      console.error(register.error)
    } else if (register.data) {
      localStorageHelper.accessToken = register.data!.access_token
      navigate(AppRoute.ROOT)
    }
  }, [register])

  return (
    <AnimateOnMount>
      <RegisterForm
        validationSchema={registerSchema}
        initialValues={{
          password: '',
          passwordConfirm: '',
          username: '',
          email: '',
        }}
        onSubmit={handleRegistration}
      />
    </AnimateOnMount>
  )
})
