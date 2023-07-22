import { AppRoute } from '../../enums/AppRoute'

export const unprotectedPages: Array<AppRoute | string> = [
  AppRoute.LOGIN,
  AppRoute.REGISTER,
]
