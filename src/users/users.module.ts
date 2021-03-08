import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

// users, verifications, roles, 개인정보 (entity 디테일하게)

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [UsersController],
})
export class UsersModule {}
