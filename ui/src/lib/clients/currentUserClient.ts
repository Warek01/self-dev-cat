import { firstValueFrom } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import * as headers from '../helpers/authHeaders.ts'
import type { JwtResponse } from '../types/JwtResponse'
import type { RegisterBody } from '../types/RegisterBody';
import type { User } from '../types/User'

const URL = 'http://localhost:3000/user'

export const currentUserClient = {
  login: async (username: string, password: string): Promise<string> => {
    const request = await firstValueFrom(
      ajax<JwtResponse>({
        url: `${URL}/user/login`,
        method: 'GET',
        headers: headers.basic(username, password),
      }),
    )

    return request.response.access_token
  },

  getData: async (accessToken: string): Promise<User | null> => {
    const request = await firstValueFrom(
      ajax<User>({
        url: URL,
        method: 'GET',
        headers: headers.bearer(accessToken),
      }),
    )

    return request.response
  },

  register: async (body: RegisterBody): Promise<User> => {
    const request = await firstValueFrom(
      ajax<User>({
        url: `${URL}/create`,
        method: 'POST',
        body
      }),
    )

    return request.response
  },
}
