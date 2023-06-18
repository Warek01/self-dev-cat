import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

@Injectable()
export class EncryptionService {
  private static _saltRounds = 5

  public async encrypt(str: string): Promise<string> {
    return await hash(str, EncryptionService._saltRounds)
  }

  public async compare(str: string, encryptedStr: string): Promise<boolean> {
    return await compare(str, encryptedStr)
  }
}
