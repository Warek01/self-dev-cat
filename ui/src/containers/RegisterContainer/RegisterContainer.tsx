import { FormikHelpers } from 'formik'
import { FC, memo, useCallback } from 'react'
import { toast } from 'react-toastify'

import { LoginValues } from '@components/LoginForm/LoginForm.types'
import { RegisterValues } from '@components/RegisterForm/RegisterForm.types'
import { register } from '@auth'
import { registerSchema } from '@validation-schemas'
import { RegisterForm } from '@components'

export const RegisterContainer: FC = memo(() => {
  const handleRegistration = useCallback(
    async (
      values: LoginValues,
      formikHelpers: FormikHelpers<RegisterValues>,
    ) => {
      const status = await register({
        username: values.username,
        password: values.password,
        email: values.username,
      })

      if (status.error) {
        toast(status.error.toString(), { type: 'error' })
      }
    },
    [],
  )

  return (
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
  )
})
