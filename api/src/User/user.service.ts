import {
  BadRequestException,
  ConflictException,
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
import { FriendRequest, User } from '@/Entities'
import { JwtResponse } from '@/Types/Jwt'
import {
  CreateUserDto,
  GetFriendsResponseDto,
  PingUsersStatusRequestDto,
  PingUsersStatusResponseDto,
  UpdateUserDto,
  UserDto,
} from '@/User/Dtos'
import { OnlineStatusIdMap } from '@/User/Types/OnlineStatusIdMap'
import { UserWsEvent } from '@/User/Enums/UserWsEvent'

@Injectable()
export class UserService {
  public readonly onlineUserIds: Record<number, NodeJS.Timeout> = {}

  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    @InjectRepository(FriendRequest)
    private readonly _friendRequestRepo: Repository<FriendRequest>,
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

    return this._authService.login(data.username)
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

  public async addFriend(
    username: string,
    friendUsername: string,
  ): Promise<void> {
    const user = await this.findOneByUsername(username)
    const friend = await this.findOneByUsername(friendUsername)

    if (!user) {
      throw new NotFoundException(`User ${username} not found`)
    }

    if (!friend) {
      throw new NotFoundException(`User ${friendUsername} not found`)
    }

    const existingRequest = await this._friendRequestRepo
      .createQueryBuilder('req')
      .where('req."fromId" = :userId', { userId: user.id })
      .andWhere('req."toId" = :friendId', { friendId: friend.id })
      .andWhere("req.status IN ('pending', 'accepted')")
      .getOne()

    if (existingRequest) {
      throw new ConflictException('Friend request already sent')
    }

    const request = this._friendRequestRepo.create()
    request.from = plainToInstance(User, user)
    request.to = plainToInstance(User, friend)

    this._friendRequestRepo.save(request)
  }

  public async getUser(
    id: number,
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
    id: number,
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

    dto.ids.forEach((id: number): void => {
      statuses.push({
        id,
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

  public async getFriends(id: number): Promise<GetFriendsResponseDto> {
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
          avatarFileName: true,
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

  private _setIsOnline(id: number): void {
    clearTimeout(this.onlineUserIds[id])

    this.onlineUserIds[id] = setTimeout(() => {
      delete this.onlineUserIds[id]
    }, 30_000)
  }
}
