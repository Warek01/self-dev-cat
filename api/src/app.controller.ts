import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EnvService } from '@/env/env.service'

@ApiTags('Debug')
@Controller()
export class AppController {
  constructor(private readonly env: EnvService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Get current mode',
  })
  @ApiResponse({
    type: String,
  })
  getMode(): string {
    return this.env.env
  }
}
