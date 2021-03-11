import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interface';

import { User } from 'src/entities/user/user.entity';
import {
  Verification,
  VerificationRepository,
} from 'src/entities/user/verification.entity';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly verificationRepository: VerificationRepository,
  ) {}

  async sendVerificationEmail(user: User) {
    const newGeneratedToken = await this.verificationRepository.generateNewToken(
      user,
    );
    console.log(`user email ${user.email} token ${newGeneratedToken}`);
  }

  async sendFindPasswordEmail(email: string) {
    const user = await this.users.findOne({ email });
    if (!user) {
      throw new NotFoundException(`the user with this email does not exist!`);
    }
    const newGeneratedToken = await this.verificationRepository.generateNewToken(
      user,
    );
    console.log(`user email ${user.email} token ${newGeneratedToken.token}`);
  }

  // 알림 메일 발송 (알림 id, 찾아서 유저한테 메일로 내용 알려줌)
}
