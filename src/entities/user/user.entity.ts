import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  AbstractRepository,
  EntityRepository,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/entities/core/core.entity';
import { PublicProfile } from './public.profile.entity';
import { PrivateProfile } from './private.profile.entity';
import { Role } from './role.entity';
import { Social } from './social.entity';
import { Notification } from 'src/entities/notification/notification.entity';

@Entity()
export class User extends CoreEntity {
  @Column('varchar', { name: 'email', nullable: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'displayName', length: 30 })
  displayName: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @Column('varchar', { name: 'snsId', nullable: true, length: 30 })
  snsId: string;

  @Column('varchar', { name: 'provider', default: 'local', length: 30 })
  provider: string;

  // relations 1:1
  @OneToOne(() => PublicProfile, (public_profile) => public_profile.user, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  public_profile: PublicProfile;

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

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async findByEmail(email: string) {
    return await this.manager.findOne(User, {
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async findByDisplayName(displayName: string) {}
  // 소셜일 때 저장하는 방법
  // 중복 확인
  // 점수 올리기
}
