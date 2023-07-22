import { firstValueFrom } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'

import * as headers from '../helpers/authHeaders'
import type { ApiFindResponse } from '../types/Api'
import type { MessageGroup } from '../types/MessageGroup'

const URL = `${import.meta.env.VITE_API_URL}/message-group`

export const messageGroupClient = {
  getAll: async (
    skip: number,
    limit: number,
    accessToken: string,
  ): Promise<ApiFindResponse<MessageGroup>> => {
    const request: AjaxResponse<ApiFindResponse<MessageGroup>> =
      await firstValueFrom(
        ajax<ApiFindResponse<MessageGroup>>({
          url: `${URL}/all`,
          method: 'GET',
          queryParams: {
            skip,
            limit,
          },
          headers: headers.bearer(accessToken),
        }),
      )

    return request.response
  },

  find: async (id: number, accessToken: string): Promise<MessageGroup> => {
    const request: AjaxResponse<MessageGroup> = await firstValueFrom(
      ajax<MessageGroup>({
        url: `${URL}/${id}`,
        method: 'GET',
        headers: headers.bearer(accessToken),
      }),
    )

    return request.response
  },
}
