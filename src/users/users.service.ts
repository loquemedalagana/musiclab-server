import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepository } from 'src/entities/user/user.entity';
import { Verification } from 'src/entities/user/verification.entity';

import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Verification)
    private verifications: Repository<Verification>, // mail service
    private userRepository: UserRepository,
  ) {}

  async createAccount(newMemberInfo: CreateAccountDto): Promise<boolean> {
    const { email, password, displayName } = newMemberInfo;
    const user = await this.users.findOne({ where: email });
    if (user) {
      return false;
    }

    const newAccount = await this.users.save({
      email,
      displayName,
      password,
    });

    console.log(newAccount);
    // 이메일로 전달하기

    return true;
  }

  async addEmail(email: string) {
    // 유저 id로 찾는다(로그인된 상태)
  }

  async addProfile() {
    // 토큰으로 찾는다.
  }

  async editProfile() {
    // 정보 수정
  }
}
