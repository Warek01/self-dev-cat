import { IsInt } from 'class-validator'

export class DeleteAllMessagesDto {
  @IsInt()
  groupId: number
}
