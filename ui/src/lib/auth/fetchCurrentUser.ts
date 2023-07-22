import { AjaxError } from 'rxjs/ajax'

import { currentUserClient } from '../clients/currentUser.client'
import { FetchStatus } from '../enums/FetchStatus'
import * as currentUserSlice from '../slices/currentUser/currentUser.slice'
import { store } from '../stores/store'
import { AuthResult } from '../types/AuthResult'

export async function fetchCurrentUser(token: string): Promise<AuthResult> {
  try {
    store.dispatch(currentUserSlice.setStatus(FetchStatus.PENDING))
    const userData = await currentUserClient.getData(token)
    store.dispatch(currentUserSlice.setUser(userData))
    store.dispatch(currentUserSlice.setStatus(FetchStatus.FULFILLED))

    return {}
  } catch (err) {
    if (err instanceof AjaxError && err.status === 401) {
      store.dispatch(currentUserSlice.setStatus(FetchStatus.REJECTED))
      return {
        unauthorized: true,
      }
    }

    store.dispatch(currentUserSlice.setStatus(FetchStatus.ERROR))

    return {
      error: err,
    }
  }
}
