import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

import { User, UserRepository } from 'src/entities/user/user.entity';
import { PublicProfile } from 'src/entities/user/public.profile.entity';
import { PrivateProfile } from 'src/entities/user/private.profile.entity';
import { Role } from 'src/entities/user/role.entity';
import {
  Verification,
  VerificationRepository,
} from 'src/entities/user/verification.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      Role,
      PrivateProfile,
      PublicProfile,
      Verification,
      VerificationRepository,
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
