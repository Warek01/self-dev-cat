import { firstValueFrom } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'

import headers from '../helpers/authHeaders'
import type { ApiFindResponse } from '../types/Api'
import type { CreateMessageGroup, MessageGroup } from '../types/MessageGroup'

const URL = `${import.meta.env.VITE_API_URL}/message-group`

export const messageGroupClient = {
  getAll: async (
    skip: number,
    limit: number,
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
          headers: headers.bearer(localStorage.getItem('access_token')!),
        }),
      )

    return request.response
  },

  find: async (id: number): Promise<MessageGroup> => {
    const request: AjaxResponse<MessageGroup> = await firstValueFrom(
      ajax<MessageGroup>({
        url: `${URL}/${id}`,
        method: 'GET',
        headers: headers.bearer(localStorage.getItem('access_token')!),
      }),
    )

    return request.response
  },

  create: async (dto: CreateMessageGroup): Promise<MessageGroup> => {
    const request: AjaxResponse<MessageGroup> = await firstValueFrom(
      ajax<MessageGroup>({
        url: URL,
        method: 'POST',
        headers: headers.bearer(localStorage.getItem('access_token')!),
        body: dto,
      }),
    )

    return request.response
  },
}
