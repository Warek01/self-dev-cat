import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(2, 'Username is too short')
    .max(255, 'Username is too long')
    .matches(
      /^[0-9a-zA-Z!@#$%^&*()\[\]\-_=+<>]+$/,
      'Username has invalid characters',
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short')
    .max(255, 'Password is too long')
    .matches(
      /^[0-9a-zA-Z!@#$%^&*()\[\]\-_=+<>]+$/,
      'Password has invalid characters',
    ),
})
