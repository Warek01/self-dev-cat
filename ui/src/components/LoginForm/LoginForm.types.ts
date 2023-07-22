import type { FormikConfig } from 'formik/dist/types'

export interface LoginFormProps {
  onSubmit: FormikConfig<LoginValues>['onSubmit']
  validationSchema: FormikConfig<LoginValues>['validationSchema']
  initialValues: FormikConfig<LoginValues>['initialValues']
}

export interface LoginValues {
  username: string
  password: string
}
