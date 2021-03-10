import {
  Column,
  Entity,
  OneToOne,
  AbstractRepository,
  EntityRepository,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// entities
import { CoreEntity } from 'src/entities/core/core.entity';
import { PublicProfile } from './public.profile.entity';
import { PrivateProfile } from './private.profile.entity';
import { Role } from './role.entity';
import { Verification } from './verification.entity';

@Entity()
export class User extends CoreEntity {
  @Column('varchar', { name: 'email', nullable: true, length: 30 })
  @IsEmail()
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
  @OneToOne(() => PublicProfile, (public_profile) => public_profile.user)
  public_profile: PublicProfile;

  @OneToOne(() => PrivateProfile, (private_profile) => private_profile.user)
  private_profile: PrivateProfile;

  @OneToOne(() => Role, (role) => role.user)
  role: Role;

  @OneToOne(() => Verification, (verification) => verification.user)
  verification: Verification;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 12);
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
  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async findByEmail(email: string) {
    return await this.manager.findOne(User, {
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async findByDisplayName(displayName: string) {
    return await this.manager.findOne(User, {
      where: { displayName },
      select: ['id', 'email', 'password'],
    });
  }

  async findByEmalilAndDisplayName(email: string, displayName: string) {
    return await this.getRepositoryFor(User)
      .createQueryBuilder('user')
      .where('displayName = :displayName OR email = :email', {
        email,
        displayName,
      })
      .getMany();
  }

  async findByToken(token: string): Promise<User> {
    const userByToken = await this.getRepositoryFor(Verification)
      .createQueryBuilder('verification')
      .select(['verification.token', 'user.id', 'user.email'])
      .where('verification.token = :token', { token })
      .innerJoin('user.verification', 'user')
      .getOneOrFail();
    console.log(userByToken);

    return userByToken.user;
  }
}
