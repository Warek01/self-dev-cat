import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'

import { UserDto } from '@/User/Dtos'
import { Log, User } from '@/Entities'

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private _logRepo: Repository<Log>) {}

  public user = {
    new: async (
      username: string,
      email: string,
      date: Date = new Date(),
    ): Promise<void> => {
      const log = await this._logRepo.create()

      log.date = date
      log.type = 'create_user'
      log.description = `Created user ${username}. With email ${email}`

      await this._logRepo.save(log)
    },

    changeData: async (
      username: string,
      email: string,
      changedData: string,
      date: Date = new Date(),
    ): Promise<void> => {
      const log = await this._logRepo.create()

      log.date = date
      log.type = 'change_user_data'
      log.description = `${username} (${email}) changed ${changedData}`

      await this._logRepo.save(log)
    },

    delete: async (
      username: string,
      email: string,
      date: Date = new Date(),
    ): Promise<void> => {
      const log = await this._logRepo.create()

      log.date = date
      log.type = 'delete_user'
      log.description = `${username} (${email}) was deleted.`

      await this._logRepo.save(log)
    },

    addFriend: async (
      username: string,
      friendUsername: string,
      date: Date = new Date(),
    ): Promise<void> => {
      const log = await this._logRepo.create()

      log.date = date
      log.type = 'delete_user'
      log.description = `${username} send friend request to ${friendUsername}.`

      await this._logRepo.save(log)
    },
  }

  public auth = {
    login: async (user: UserDto, date: Date = new Date()): Promise<void> => {
      const log = await this._logRepo.create()

      log.date = date
      log.type = 'login'
      log.description = `${user.username} logged in`
      log.user = plainToInstance(User, user)
      log.username = user.username

      await this._logRepo.save(log)
    },
  }
}
