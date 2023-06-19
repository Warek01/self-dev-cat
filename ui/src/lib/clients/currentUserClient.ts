import { firstValueFrom } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import type { User } from '../types/User'
import * as headers from '../helpers/authHeaders.ts'

const URL = 'http://localhost:3000'

export const currentUserClient = {
  getData: async (accessToken: string): Promise<User | null> => {
    const request = await firstValueFrom(
      ajax<User>({
        url: `${URL}/user`,
        method: 'GET',
        headers: headers.bearer(accessToken),
      }),
    )

    return request.response
  },
}
