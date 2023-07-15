import { currentUserClient } from '../clients/currentUser.client.ts'
import { FetchStatus } from '../enums/FetchStatus.ts'
import * as currentUserSlice from '../slices/currentUser/currentUser.slice.ts'
import { store } from '../stores/store.ts'
import type { AuthResult } from '../types/AuthResult.ts'
import type { RegisterBody } from '../types/RegisterBody.ts'

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
