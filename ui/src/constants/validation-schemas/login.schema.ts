import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Username is required')
    .email('This is not an email'),
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Password is too short')
    .max(255, 'Password is too long')
    .matches(
      /^[0-9a-zA-Z!@#$%^&*()\[\]\-_=+<>]+$/,
      'Password has invalid characters',
    ),
})
