import { useRegisterUserMutation } from '@slices'
import { FormikHelpers } from 'formik'
import { FC, memo, useCallback } from 'react'

import type { LoginValues } from '@components/LoginForm/LoginForm.types'
import type { RegisterValues } from '@components/RegisterForm/RegisterForm.types'
import { registerSchema } from '@validation-schemas'
import { RegisterForm } from '@components'

export const RegisterContainer: FC = memo(() => {
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
