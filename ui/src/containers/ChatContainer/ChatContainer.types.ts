import type { SendMessage } from '../../types/Chat'
import type { ApiFindResponse } from '../../types/Api'
import type { Message } from '../../types/Message'
import type { CreateMessageGroup, MessageGroup } from '../../types/MessageGroup'

export interface ChatContainerContextProps {
  messageGroups: MessageGroup[]

  sendMessage: (message: SendMessage) => Promise<void>

  requestMessages: (
    groupId: number,
    skip: number,
    limit: number,
  ) => Promise<ApiFindResponse<Message>>

  requestMessageGroups: (skip: number, limit: number) => Promise<void>

  createMessageGroup: (dto: CreateMessageGroup) => Promise<void>
}
