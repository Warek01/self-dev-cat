import * as yup from 'yup'

export const isEmail = (str: string): boolean =>
  yup.string().min(3).max(255).email().isValidSync(str)
