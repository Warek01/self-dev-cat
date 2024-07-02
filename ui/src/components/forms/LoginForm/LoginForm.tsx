import { FC, memo, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'

import icons from '@icons'
import { AppRoute } from '@enums/app-route'
import { useLoginMutation } from '@/redux/user.api'
import { loginSchema } from '@constants/validation-schemas'
import { useAppDispatch } from '@hooks'
import { FormTextField } from '@components/forms'
import { Button } from '@components/input'
import { setUser } from '@redux/auth.slice'
import { localStorageHelper } from '@helpers'

const initialValues = { email: '', password: '' }

export const LoginForm: FC = memo(() => {
  const navigate = useNavigate()
  const [triggerLogin, loginData] = useLoginMutation()
  const dispatch = useAppDispatch()

  const handleLogin = useCallback(
    async (
      values: typeof initialValues,
      formikHelpers: FormikHelpers<typeof initialValues>,
    ) => {
      triggerLogin(values)
      formikHelpers.resetForm()
    },
    [],
  )

  useEffect(() => {
    if (loginData.isError) {
      toast('Login error', { type: 'error' })
      console.error(loginData.error)
      return
    } else if (loginData.data) {
      const token: string = loginData.data.token
      localStorageHelper.accessToken = token

      dispatch(setUser(token))
      navigate(AppRoute.ROOT)
    }
  }, [loginData])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={loginSchema}
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
            password
            name="password"
            placeholder="Password"
            className="w-full sm:w-xs md:w-sm lg:w-md"
            autoComplete
          />
          <Button
            disabled={isSubmitting}
            submit
            text="Log in"
            className="py-2 px-4 rounded-md mt-8 shadow-lg hover:shadow-xl hover:bg-black/10"
          />
          <Link to={AppRoute.REGISTER}>Register</Link>
        </Form>
      )}
    </Formik>
  )
})
