import { IsUUID } from 'class-validator'

export class DeleteAllMessagesDto {
  @IsUUID('4')
  groupId: string
}
