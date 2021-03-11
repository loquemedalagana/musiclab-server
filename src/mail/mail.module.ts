import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG_OPTIONS } from '../common/constants/common.constants';
import { MailModuleOptions } from './mail.interface';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

// entities (notifications should be added)
import { User } from 'src/entities/user/user.entity';
import {
  Verification,
  VerificationRepository,
} from 'src/entities/user/verification.entity';
import { Role } from 'src/entities/user/role.entity';

@Module({
  controllers: [MailController],
})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
      imports: [
        TypeOrmModule.forFeature([
          User,
          Verification,
          VerificationRepository,
          Role,
        ]),
      ],
      exports: [MailService],
    };
  }
}
