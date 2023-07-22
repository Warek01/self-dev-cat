import { AjaxError } from 'rxjs/ajax'

import { currentUserClient } from '../clients'
import { FetchStatus } from '../enums/FetchStatus'
import {
  setStatus,
  setToken,
  setUser,
} from '../slices/currentUser/currentUser.slice'
import { store } from '../constants/store'
import type { AuthResult } from '../types/AuthResult'
import type { BasicAuthCredentials } from '../types/BasicAuthCredentials'

export const login = async ({
  username,
  password,
}: BasicAuthCredentials): Promise<AuthResult> => {
  try {
    store.dispatch(setStatus(FetchStatus.PENDING))
    const token = await currentUserClient.login(username, password)
    store.dispatch(setToken(token))

    return {}
  } catch (err) {
    if (err instanceof AjaxError && err.status === 401) {
      store.dispatch(setStatus(FetchStatus.REJECTED))
      return {
        unauthorized: true,
      }
    }

    store.dispatch(setStatus(FetchStatus.ERROR))
    store.dispatch(setUser(null))
    store.dispatch(setToken(null))

    return {
      error: err,
    }
  }
}
