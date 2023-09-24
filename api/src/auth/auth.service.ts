import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import bcrypt from 'bcrypt'

import { EnvService } from '@/env/env.service'
import type { JwtResponse } from '@/types/jwt'
import { JwtPayload } from '@/types/jwt'
import { User } from '@/entities/user.entity'
import { UserDto } from '@/user/dto/user.dto'
import { CreateUserDto } from '@/user/dto/create-user.dto'

import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly env: EnvService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  public async login({ email, password }: LoginDto): Promise<JwtResponse> {
    const user: User | null = await this.usersRepo.findOneBy({ email })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException()
    }

    const payload: JwtPayload = { user: plainToInstance(UserDto, user) }

    return {
      token: this.jwtService.sign(payload, {
        secret: this.env.jwt.secret,
        expiresIn: this.env.jwt.expiresIn,
      }),
    }
  }

  public async register(dto: CreateUserDto): Promise<JwtResponse> {
    const userExists: boolean = await this.usersRepo.exist({
      where: { email: dto.email },
    })

    if (userExists) {
      throw new ConflictException()
    }

    const user: User = this.usersRepo.create()
    user.email = dto.email
    user.password = await bcrypt.hash(dto.password, 10)
    user.username = dto.username
    user.realName = dto.realName ?? user.realName

    await this.usersRepo.save(user)
    return this.login({ email: dto.email, password: dto.password })
  }
}
