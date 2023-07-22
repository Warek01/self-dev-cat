import { currentUserClient } from '../clients/currentUser.client'
import { FetchStatus } from '../enums/FetchStatus'
import * as currentUserSlice from '../slices/currentUser/currentUser.slice'
import { store } from '../constants/store'
import type { AuthResult } from '../types/AuthResult'
import type { RegisterBody } from '../types/RegisterBody'

export async function register(body: RegisterBody): Promise<AuthResult> {
  try {
    store.dispatch(currentUserSlice.setStatus(FetchStatus.PENDING))
    const { access_token } = await currentUserClient.register(body)
    store.dispatch(currentUserSlice.setToken(access_token))
    return {}
  } catch (err) {
    return {
      error: err,
    }
  }
}
