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
import { Repository } from 'typeorm'

import { CreateUserDto, UpdateUserDto, UserDto } from '@/User/Dtos'
import { FriendRequest, User } from '@/Entities'
import { EncryptionService } from '@/Encryption/encryption.service'
import { LogService } from '@/Log/log.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _userRepo: Repository<User>,
    @InjectRepository(FriendRequest)
    private _friendRequestRepo: Repository<FriendRequest>,
    @Inject(forwardRef(() => EncryptionService))
    private _encryptionService: EncryptionService,
    @Inject(forwardRef(() => LogService))
    private _logService: LogService,
  ) {}

  public async create(data: CreateUserDto): Promise<UserDto> {
    if (
      (await this.findOneByEmail(data.email)) ||
      (await this.findOneByUsername(data.username))
    ) {
      throw new NotAcceptableException('Email already registered.')
    }

    if (await this.findOneByUsername(data.username)) {
      throw new NotAcceptableException('Username already taken.')
    }

    const user = await this._userRepo.create()
    user.email = data.email
    user.password = await this._encryptionService.encrypt(data.password)
    user.username = data.username
    user.realName = data.realName || user.realName

    await this._userRepo.save(user)
    this._logService.user.new(user.username, user.email)

    return plainToInstance(UserDto, user)
  }

  public async findOneByEmail(email: string): Promise<UserDto | null> {
    const user = await this._userRepo.findOne({
      where: {
        email,
      },
    })

    return plainToInstance(UserDto, user)
  }

  public async findOneByUsername(username: string): Promise<UserDto | null> {
    const user = await this._userRepo.findOneBy({ username })

    return plainToInstance(UserDto, user)
  }

  public async updateUser(username: string, dto: UpdateUserDto): Promise<UserDto> {
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

    this._logService.user.delete(user.username, user.email)
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
    request.status = 'pending'

    await this._friendRequestRepo.save(request)
    await this._logService.user.addFriend(user.username, friend.username)
  }

  public async removeFriend(): Promise<void> {}
}
