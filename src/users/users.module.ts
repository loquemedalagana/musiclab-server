import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

import { User } from 'src/entities/user/user.entity';
import { PublicProfile } from 'src/entities/user/public.profile.entity';
import { PrivateProfile } from 'src/entities/user/private.profile.entity';
import { Role } from 'src/entities/user/role.entity';
import { Verification } from 'src/entities/user/verification.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      PrivateProfile,
      PublicProfile,
      Verification,
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
