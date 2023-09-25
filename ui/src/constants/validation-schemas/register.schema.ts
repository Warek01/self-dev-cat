import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(2, 'Username is too short')
    .max(255, 'Username is too long')
    .matches(
      /^[0-9a-zA-Z!@#$%^&*()\[\]\-_=+<>]+$/,
      'Username has invalid characters',
    ),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .min(6, 'Email is too short')
    .max(255, 'Email is too long'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short')
    .max(255, 'Password is too long')
    .matches(
      /^[0-9a-zA-Z!@#$%^&*()\[\]\-_=+<>]+$/,
      'Password has invalid characters',
    ),
  passwordConfirm: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short')
    .max(255, 'Password is too long')
    .matches(
      /^[0-9a-zA-Z!@#$%^&*()\[\]\-_=+<>]+$/,
      'Password has invalid characters',
    ),
})
