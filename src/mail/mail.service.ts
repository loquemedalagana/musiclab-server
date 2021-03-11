import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interface';

import { User } from 'src/entities/user/user.entity';
import { Verification } from 'src/entities/user/verification.entity';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
  ) {}

  // 개인 정보 이메일 발송 (로컬가입, 이메일 등록 유저)
  sendVerificationEmail(userInfo: User) {
    // generate verification code

  }

  // 비밀번호 찾기 메일
  // 이메일에 해당하는 유저가 있으면 보내고,
  // 없으면 접근 에러 던짐
  async sendFindPasswordEmail(email: string) {
    const user = await this.users.findOne({ email });
    if (!user) {
      throw new NotFoundException(`the user with this email does not exist!`);
    }
    console.log(user);
    // 이메일 보내는 부분
  }

  // 알림 메일 발송 (알림 id, 찾아서 유저한테 메일로 내용 알려줌)
}
