import { firstValueFrom } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'

import * as headers from '../helpers/authHeaders.ts'
import { ApiFindResponse } from '../types/Api.ts'
import { Message } from '../types/Message.ts'

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
