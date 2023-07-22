import { Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import { Button, FormTextField } from '@components'
import icons from '@icons'
import { AppRoute } from '@enums/AppRoute'
import type { RegisterFormProps, RegisterValues } from './RegisterForm.types'

export const RegisterForm: FC<RegisterFormProps> = memo(
  ({ validationSchema, onSubmit, initialValues }) => {
    return (
      <Formik
        initialValues={initialValues as RegisterValues}
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
  },
)
