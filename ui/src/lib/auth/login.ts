import { AjaxError } from 'rxjs/ajax'

import { currentUserClient } from '../clients/currentUser.client'
import { FetchStatus } from '../enums/FetchStatus'
import { setToken, setUser } from '../slices/currentUser/currentUser.slice'
import * as currentUserSlice from '../slices/currentUser/currentUser.slice'
import { store } from '../stores/store'
import { AuthResult } from '../types/AuthResult'
import type { BasicAuthCredentials } from '../types/BasicAuthCredentials'

export async function login({
  username,
  password,
}: BasicAuthCredentials): Promise<AuthResult> {
  try {
    store.dispatch(currentUserSlice.setStatus(FetchStatus.PENDING))
    const token = await currentUserClient.login(username, password)
    store.dispatch(currentUserSlice.setToken(token))

    return {}
  } catch (err) {
    if (err instanceof AjaxError && err.status === 401) {
      store.dispatch(currentUserSlice.setStatus(FetchStatus.REJECTED))
      return {
        unauthorized: true,
      }
    }

    store.dispatch(currentUserSlice.setStatus(FetchStatus.ERROR))
    store.dispatch(setUser(null))
    store.dispatch(setToken(null))

    return {
      error: err,
    }
  }
}
