import { AjaxError } from 'rxjs/ajax'

import { currentUserClient } from '../clients'
import { FetchStatus } from '../enums/FetchStatus'
import { setStatus, setUser } from '../slices/currentUser/currentUser.slice'
import { store } from '../constants/store'
import { AuthResult } from '../types/AuthResult'

export const fetchCurrentUser = async (token: string): Promise<AuthResult> => {
  try {
    store.dispatch(setStatus(FetchStatus.PENDING))
    const userData = await currentUserClient.getData(token)
    store.dispatch(setUser(userData))
    store.dispatch(setStatus(FetchStatus.FULFILLED))

    return {}
  } catch (err) {
    if (err instanceof AjaxError && err.status === 401) {
      store.dispatch(setStatus(FetchStatus.REJECTED))
      return {
        unauthorized: true,
      }
    }

    store.dispatch(setStatus(FetchStatus.ERROR))

    return {
      error: err,
    }
  }
}
