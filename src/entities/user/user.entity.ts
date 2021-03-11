import {
  Column,
  Entity,
  OneToOne,
  AbstractRepository,
  EntityRepository,
  JoinColumn,
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
import { CreateAccountDto } from '../../users/dtos/create-account.dto';
import {
  AddPersonalInfoDto,
  UpdateAccountDto,
} from '../../users/dtos/update-account.dto';

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
  @JoinColumn()
  public_profile: PublicProfile;

  @OneToOne(() => PrivateProfile, (private_profile) => private_profile.user)
  @JoinColumn()
  private_profile: PrivateProfile;

  @OneToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;

  @OneToOne(() => Verification, (verification) => verification.user)
  @JoinColumn()
  verification: Verification;

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

  async createAccount(data: CreateAccountDto) {
    const { email, password, displayName } = data;
    const hashed = await this.hashedPassword(password);
    const inputResult = await this.getRepositoryFor(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email,
        password: hashed,
        displayName,
      })
      .execute();
    const { identifiers } = inputResult;
    return await this.manager.findOneOrFail(User, {
      id: identifiers[0].id,
    });
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

  async findByToken(token: string): Promise<Verification> {
    return await this.getRepositoryFor(Verification)
      .createQueryBuilder('verification')
      .select(['verification.id', 'user.id', 'user.email'])
      .where('verification.token = :token', { token })
      .innerJoin('user.verification', 'user')
      .getOneOrFail();
  }

  async addPersonalInfo(userInfo: User, addedPersonalInfo: AddPersonalInfoDto) {
    const {
      birthday,
      gender,
      givenName,
      familyName,
      avatar,
      thumbnail,
      description,
    } = addedPersonalInfo;
    const newUserPublicProfile = await this.manager.create(PublicProfile, {
      avatar,
      thumbnail,
      description,
      user: userInfo,
    });
    const newUserPrivateProfile = await this.manager.create(PrivateProfile, {
      birthday,
      gender,
      givenName,
      familyName,
      user: userInfo,
    });

    const privateInfo = await this.manager.save(
      PublicProfile,
      newUserPublicProfile,
    );
    const publicInfo = await this.manager.save(
      PrivateProfile,
      newUserPrivateProfile,
    );

    return [publicInfo, privateInfo];
  }
}
