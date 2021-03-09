import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  AbstractRepository,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/entities/core/core.entity';
import { PrivateProfile } from './private.profile.entity';
import { Role } from './role.entity';
import { Social } from './social.entity';
import { Notification } from 'src/entities/notification/notification.entity';

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

  @Column({ type: 'text', nullable: true })
  description: string;

  // relations 1:1
  @OneToOne(() => PrivateProfile, (private_profile) => private_profile.user, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  private_profile: PrivateProfile;

  @OneToOne(() => Role, (role) => role.user, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  role: Role;

  // social
  /*
  @OneToOne(() => Social, (social) => social.user, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  social: Social;
  * */

  // relations 1:N
  /*
  @OneToMany(() => Notification, (notification) => notification.sender, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  sent_notifications: Notification[];

  @OneToMany(() => Notification, (notification) => notification.receiver, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  received_notifications: Notification[];
  * */

  // 좋아요 목록

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
      return await bcrypt.compare(aPassword, this.password);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}

export class UserRepository extends AbstractRepository<User> {
  // find or create
  // 소셜일 때 저장하는 방법
  // 중복 확인
  // 점수 올리기
}
