import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  AbstractRepository,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Profile } from './profile.entity';
import { Role } from './role.entity';
import { Social } from './social.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity()
export class User extends CoreEntity {
  @Column('varchar', { name: 'email', nullable: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'displayName', nullable: true, length: 30 })
  displayName: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @Column('varchar', { name: 'snsId', nullable: true, length: 30 })
  snsId: string;

  @Column('varchar', { name: 'provider', default: 'local', length: 30 })
  provider: string;

  @Column('varchar', { length: 15, default: 'en' })
  locale: string;

  @Column('int', { default: -1 })
  points: number;

  @Column('varchar', { nullable: true, length: 300 })
  image: string;

  @Column('varchar', { nullable: true, length: 300 })
  thumbnail: string;

  // relations
  @OneToOne(() => Profile, (profile) => profile.user, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Role, (role) => role.user, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  role: Role;

  @OneToOne(() => Social, (social) => social.user, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  social: Social;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}

export class UserRepository extends AbstractRepository<User> {
  // find or create
  // 중복 확인
}
