import { firstValueFrom } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'

import headers from '../helpers/authHeaders'
import type { ApiFindResponse } from '../types/Api'
import type { Message } from '../types/Message'

const URL = `${import.meta.env.VITE_API_URL}/message`

export const messageClient = {
  getAll: async (
    groupId: number,
    skip: number,
    limit: number,
    accessToken: string,
  ): Promise<ApiFindResponse<Message>> => {
    const request: AjaxResponse<ApiFindResponse<Message>> =
      await firstValueFrom(
        ajax<ApiFindResponse<Message>>({
          url: `${URL}/all`,
          method: 'GET',
          queryParams: {
            skip,
            limit,
            groupId,
          },
          headers: headers.bearer(accessToken),
        }),
      )

    return request.response
  },
}
