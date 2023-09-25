import { Form, Formik, FormikHelpers } from 'formik'
import { FC, memo, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@components/input'
import { FormTextField } from '@components/forms'
import icons from '@icons'
import { AppRoute } from '@enums/AppRoute'
import { useRegisterUserMutation } from '@/redux/user.api'
import { registerSchema } from '@constants/validation-schemas'
import { useAppDispatch } from '@hooks'
import { setUser } from '@/redux/auth.slice'
import { localStorageHelper } from "@helpers";

const initialValues = {
  password: '',
  passwordConfirm: '',
  username: '',
  email: '',
}

export const RegisterForm: FC = memo(() => {
  const navigate = useNavigate()
  const [triggerRegister, register] = useRegisterUserMutation()
  const dispatch = useAppDispatch()

  const handleRegistration = useCallback(
    async (
      values: typeof initialValues,
      formikHelpers: FormikHelpers<typeof initialValues>,
    ) => {
      triggerRegister({
        username: values.username,
        password: values.password,
        email: values.email,
      })

      formikHelpers.resetForm()
    },
    [],
  )

  useEffect(() => {
    if (register.isError) {
      toast('Login error', { type: 'error' })
      console.error(register.error)
      return
    } else if (register.data) {
      const token: string = register.data.token
      localStorageHelper.accessToken = token

      dispatch(setUser(token))
      navigate(AppRoute.ROOT)
    }
  }, [register])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegistration}
      validationSchema={registerSchema}
    >
      {({ isSubmitting }) => (
        <Form
          className="max-w-3xl flex flex-col gap-6 items-center w-full
            dark:bg-dark-white/5 rounded-xl p-12 shadow-xl"
        >
          <div className="p-4 bg-black/5 dark:bg-dark-white/5 rounded-full mb-6 shadow-xl">
            <icons.User width={48} height={48} />
          </div>
          <FormTextField
            disabled={isSubmitting}
            name="email"
            placeholder="Email"
            className="w-full sm:w-xs md:w-sm lg:w-md"
            autoComplete
          />
          <FormTextField
            disabled={isSubmitting}
            name="username"
            placeholder="Username"
            className="w-full sm:w-xs md:w-sm lg:w-md"
            autoComplete
          />
          <FormTextField
            disabled={isSubmitting}
            name="password"
            placeholder="Password"
            className="w-full sm:w-xs md:w-sm lg:w-md"
            autoComplete
            password
          />
          <FormTextField
            disabled={isSubmitting}
            name="passwordConfirm"
            placeholder="Confirm password"
            className="w-full sm:w-xs md:w-sm lg:w-md"
            autoComplete
            password
          />
          <Button
            disabled={isSubmitting}
            submit
            text="Create account"
            className="py-2 px-4 rounded-md mt-8 shadow-lg hover:bg-transparent hover:shadow-xl dark:hover:bg-dark-white/10"
          />
          <Link to={AppRoute.LOGIN}>Have an account?</Link>
        </Form>
      )}
    </Formik>
  )
})
