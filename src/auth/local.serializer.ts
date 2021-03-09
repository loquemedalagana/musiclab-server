import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { AuthService } from './auth.service';
import { User } from 'src/entities/user/user.entity';
import { Role } from 'src/entities/user/role.entity';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  // constructer
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Role) private role: Repository<Role>,
    private readonly connection: Connection,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  // deserialize user
  async deserializeUser(userId: string, done: CallableFunction) {
    // 해당하는 유저 찾기, 어드민인지?
    return await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .select(['user.id', 'user.displayName', 'user.email', 'role.category'])
      .leftJoin('user.role', 'role')
      .where('user.id = :id', { id: userId })
      .getOneOrFail()
      .then((user) => {
        console.log(user);
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
