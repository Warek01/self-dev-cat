import type { SendMessage } from '../../lib/ws/types/chat.ts'
import type { ApiFindResponse } from '../../lib/types/Api.ts'
import type { Message } from '../../lib/types/Message.ts'
import type { MessageGroup } from '../../lib/types/MessageGroup.ts'

export interface ChatContainerContextProps {
  sendMessage: (message: SendMessage) => Promise<void>

  requestMessages: (
    groupId: number,
    skip: number,
    limit: number,
  ) => Promise<ApiFindResponse<Message>>

  requestMessageGroups: (
    skip: number,
    limit: number,
  ) => Promise<ApiFindResponse<MessageGroup>>
}
