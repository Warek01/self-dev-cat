import type { FormikConfig } from 'formik/dist/types'

export interface RegisterFormProps {
  validationSchema: FormikConfig<RegisterValues>['validationSchema']
  onSubmit: FormikConfig<RegisterValues>['onSubmit']
  initialValues: FormikConfig<RegisterValues>['initialValues']
}

export interface RegisterValues {
  email: string
  username: string
  password: string
  passwordConfirm: string
}
