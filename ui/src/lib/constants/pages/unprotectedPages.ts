import { AppRoute } from '../../enums/AppRoute.ts'

export const unprotectedPages: Array<AppRoute | string> = [
  AppRoute.LOGIN,
  AppRoute.REGISTER,
]
