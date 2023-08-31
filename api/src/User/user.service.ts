import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm'
import { WsResponse } from '@nestjs/websockets'

import { AuthService } from '@/Auth/auth.service'
import { EncryptionService } from '@/Encryption/encryption.service'
import { User } from '@/Entities'
import { JwtResponse } from '@/Types/Jwt'
import {
  CreateUserDto,
  GetFriendsResponseDto,
  GetUsersResponseDto,
  PingUsersStatusRequestDto,
  PingUsersStatusResponseDto,
  UpdateUserDto,
  UserDto,
} from '@/User/Dtos'
import { OnlineStatusIdMap } from '@/User/Types/OnlineStatusIdMap'
import { UserWsEvent } from '@/User/Enums/UserWsEvent'
import { GetUsersRequestDto } from '@/User/Dtos/GetUsersRequest.dto'

@Injectable()
export class UserService {
  public readonly onlineUserIds: Record<string, NodeJS.Timeout> = {}

  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    @Inject(forwardRef(() => EncryptionService))
    private readonly _encryptionService: EncryptionService,
    @Inject(forwardRef(() => AuthService))
    private readonly _authService: AuthService,
  ) {}

  public async register(data: CreateUserDto): Promise<JwtResponse> {
    if (
      (await this.findOneByEmail(data.email)) ||
      (await this.findOneByUsername(data.username))
    ) {
      throw new NotAcceptableException('Email already registered.')
    }

    if (await this.findOneByUsername(data.username)) {
      throw new NotAcceptableException('Username already taken.')
    }

    const user: User = await this._userRepo.create()
    user.email = data.email
    user.password = await this._encryptionService.encrypt(data.password)
    user.username = data.username
    user.realName = data.realName || user.realName

    await this._userRepo.save(user)
    return this._authService.login(data.username, data.password)
  }

  public async findOneByEmail(email: string): Promise<UserDto | null> {
    const user = await this._userRepo.findOne({
      where: {
        email,
      },
    })

    return plainToInstance(UserDto, user)
  }

  public async findOneByUsername(
    username: string,
    withPassword: boolean = false,
  ): Promise<UserDto | null> {
    const user = await this._userRepo.findOneBy({ username })

    return plainToInstance(UserDto, user, {
      groups: withPassword ? ['with-password'] : [],
    })
  }

  public async findOneById(
    id: string,
    withPassword: boolean = false,
  ): Promise<UserDto | null> {
    const user = await this._userRepo.findOneBy({ id })

    return plainToInstance(UserDto, user, {
      groups: withPassword ? ['with-password'] : [],
    })
  }

  public async updateUser(
    username: string,
    dto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.findOneByUsername(username)

    if (!user) {
      throw new NotFoundException()
    }

    user.realName = dto.realName ?? user.realName

    if (dto.password) {
      user.password = await this._encryptionService.encrypt(dto.password)
    }

    if (dto.username) {
      if (await this.isUsernameTaken(dto.username)) {
        throw new BadRequestException(
          `Username ${dto.username} is already taken.`,
        )
      }

      user.username = dto.username
    }

    if (dto.email) {
      if (await this.isEmailTaken(dto.email)) {
        throw new BadRequestException(`Email ${dto.email} is already taken.`)
      }

      user.email = dto.email
    }

    await this._userRepo.save(plainToInstance(User, user))

    return user
  }

  public async isUsernameTaken(username: string): Promise<boolean> {
    return (await this._userRepo.countBy({ username })) > 0
  }

  public async isEmailTaken(email: string): Promise<boolean> {
    return (await this._userRepo.countBy({ email })) > 0
  }

  public async delete(username: string): Promise<void> {
    const user = await this.findOneByUsername(username)

    if (!user) {
      throw new NotFoundException()
    }

    await this._userRepo.delete({
      username,
    })
  }

  public async getUser(
    id: string,
    relations?: FindOptionsRelations<User>,
    select?: FindOptionsSelect<User>,
  ): Promise<UserDto | null> {
    const user: User | null = await this._userRepo.findOne({
      where: { id },
      relations,
      select,
    })

    if (!user) {
      return null
    }

    return plainToInstance(UserDto, user)
  }

  public async getUserOrThrow(
    id: string,
    relations?: FindOptionsRelations<User>,
    select?: FindOptionsSelect<User>,
  ): Promise<UserDto> {
    const user: UserDto | null = await this.getUser(id, relations, select)

    if (!user) {
      throw new NotFoundException(`user ${id} not found`)
    }

    return user
  }

  public async removeFriend(): Promise<void> {}

  public pingUserStatus(
    dto: PingUsersStatusRequestDto,
  ): WsResponse<PingUsersStatusResponseDto> {
    const statuses: OnlineStatusIdMap[] = []

    dto.ids.forEach((id) => {
      statuses.push({
        userId: id,
        online: !!this.onlineUserIds[id] ?? false,
      })
    })

    return {
      event: UserWsEvent.PING_ONLINE_STATUS,
      data: plainToInstance(PingUsersStatusResponseDto, {
        data: statuses,
      } as PingUsersStatusResponseDto),
    }
  }

  public async getFriends(id: string): Promise<GetFriendsResponseDto> {
    const user = await this._userRepo.findOne({
      where: {
        id,
      },
      relations: {
        friends: true,
      },
      select: {
        friends: {
          username: true,
          id: true,
          email: true,
          realName: true,
        },
      },
    })

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return plainToInstance(GetFriendsResponseDto, {
      items: user.friends,
      count: user.friends.length,
    } as GetFriendsResponseDto)
  }

  public async getAll(query: GetUsersRequestDto): Promise<GetUsersResponseDto> {
    const [items, count] = await this._userRepo.findAndCount({
      skip: query.skip ?? 0,
      take: query.limit ?? 10,
    })

    return plainToInstance(GetUsersResponseDto, {
      items,
      count,
    })
  }

  // private _setIsOnline(id: string): void {
  //   clearTimeout(this.onlineUserIds[id])
  //
  //   this.onlineUserIds[id] = setTimeout(() => {
  //     delete this.onlineUserIds[id]
  //   }, 30_000)
  // }
}
