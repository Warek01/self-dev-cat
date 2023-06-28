import { currentUserClient } from '../clients/currentUserClient.ts';
import { FetchStatus } from '../enums/FetchStatus.ts'
import * as currentUserSlice from '../slices/currentUser/currentUser.slice.ts'
import { store } from '../stores/store.ts'
import type { AuthResult } from '../types/AuthResult'
import type { RegisterBody } from '../types/RegisterBody'
import { User } from '../types/User';

export async function register(body: RegisterBody): Promise<AuthResult> {
  try {
    store.dispatch(currentUserSlice.setStatus(FetchStatus.PENDING))
    const data: User = await currentUserClient.register(body)

    if (!data) {
      throw new Error('No data')
    }
    const token = await currentUserClient.login(body.username, body.password)

    store.dispatch(currentUserSlice.setUser(data))
    store.dispatch(currentUserSlice.setToken(token))
    store.dispatch(currentUserSlice.setStatus(FetchStatus.FULFILLED))

    return {}
  } catch (err) {
    return {
      error: err,
    }
  }
}
