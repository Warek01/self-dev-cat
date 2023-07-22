import { firstValueFrom } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'

import headers from '../helpers/authHeaders'
import type { ApiFindResponse } from '../types/Api'
import type { User } from '../types/User'

const URL = `${import.meta.env.VITE_API_URL}/user`

export const userClient = {
  getFriends: async (id: number): Promise<ApiFindResponse<User>> => {
    const request: AjaxResponse<ApiFindResponse<User>> = await firstValueFrom(
      ajax<ApiFindResponse<User>>({
        url: `${URL}/${id}/friends`,
        method: 'GET',
        headers: headers.bearer(localStorage.getItem('access_token')!),
      }),
    )

    return request.response
  },
}
