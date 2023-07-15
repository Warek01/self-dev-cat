import { firstValueFrom } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'

import * as headers from '../helpers/authHeaders.ts'
import type { ApiFindResponse } from '../types/Api.ts'
import type { MessageGroup } from '../types/MessageGroup.ts'

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
}
