import { Exclude, Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

@Exclude()
export class AttachmentDto {
  @ApiProperty({ type: String })
  @Expose()
  id: string

  @ApiProperty({ type: String })
  @Expose()
  name: string

  @ApiProperty({ type: Number })
  @Expose()
  originalSize: number

  @ApiProperty({ type: Number })
  @Expose()
  size: number

  @ApiProperty({ type: String })
  @Expose()
  mime: string

  @ApiProperty({ type: String })
  @Expose()
  createdAt: string

  @ApiProperty({ type: String })
  @Expose()
  updatedAt: string
}
