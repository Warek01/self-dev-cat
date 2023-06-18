import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Debug')
@Controller()
export class AppController {
  constructor(private _configService: ConfigService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Get current mode',
  })
  @ApiResponse({
    type: String,
  })
  getMode(): string {
    return this._configService.get<string>('env')!
  }
}
