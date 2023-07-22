import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'

import { Button, FormTextField } from '@components'
import icons from '@icons'
import { AppRoute } from '@enums/AppRoute'
import type { LoginFormProps } from './LoginForm.types'

export const LoginForm: FC<LoginFormProps> = memo(
  ({ onSubmit, validationSchema, initialValues }) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
              name="username"
              placeholder="Username"
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
  },
)
