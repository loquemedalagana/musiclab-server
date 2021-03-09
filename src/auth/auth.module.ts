import { Module, DynamicModule } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constants';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalSerializer } from './local.serializer';

import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

// entities
import { User, UserRepository } from 'src/entities/user/user.entity';
import { Role } from 'src/entities/user/role.entity';

// 소셜 추가하고 옵션 넣기
@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    TypeOrmModule.forFeature([User, Role, UserRepository]),
  ],
  providers: [AuthService, LocalSerializer],
})
export class AuthModule {}
