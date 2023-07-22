import type { SendMessage } from '../../lib/ws/types/chat'
import type { ApiFindResponse } from '../../lib/types/Api'
import type { Message } from '../../lib/types/Message'
import type { MessageGroup } from '../../lib/types/MessageGroup'

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
