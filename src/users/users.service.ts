import {
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepository } from 'src/entities/user/user.entity';
import {
  Verification,
  VerificationRepository,
} from 'src/entities/user/verification.entity';

import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto, AddPersonalInfo } from './dtos/update-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>, // mail service
    private readonly userRepository: UserRepository,
    private readonly verificationRepository: VerificationRepository,
    private readonly connection: Connection,
  ) {}

  async getAllUsersInfo(): Promise<User[]> {
    try {
      return await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.displayName',
          'user.email',
          'role.category',
          'public_profile.image',
          'public_profile.thumbnail',
        ])
        .leftJoin('user.role', 'role')
        .leftJoin('user.public_profile', 'public_profile')
        .leftJoin('user.private_profile', 'private_profile')
        .getMany();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `couldn't load all video data due to server error`,
      );
    }
  }

  sendVerificationEmail(email: string, token: string) {
    console.log(`email will be sent to ${email}, token ${token}`);
  }

  async createAccount(newMemberInfo: CreateAccountDto): Promise<boolean> {
    const { email, password, displayName } = newMemberInfo;
    const [user] = await this.userRepository.findByEmalilAndDisplayName(
      email,
      displayName,
    );
    console.log('found user', user);
    if (user) {
      throw new ForbiddenException(`this account already exists`);
    }

    try {
      const newAccount = new User();
      newAccount.email = email;
      newAccount.password = password;
      newAccount.displayName = displayName;
      await newAccount.hashPassword();
      console.log(newAccount);
      await this.users.save(newAccount);

      const oldVerification = await this.verificationRepository.findExistingToken(
        email,
      );
      if (oldVerification) {
        await this.verifications.delete(oldVerification);
      }

      const newVerification = await this.verifications.save(
        this.verifications.create({
          user: newAccount,
        }),
      );

      this.sendVerificationEmail(newAccount.email, newVerification.token);

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('internal server error');
    }
  }

  async addEmail(userInfo: User, email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ForbiddenException(`this account already exists`);
    }
    try {
      userInfo.email = email;
      await this.users.save(userInfo);
      this.sendVerificationEmail(email, 'dssaa');
      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('internal server error');
    }
  }

  async verifyUser(token: string, personalInfo: AddPersonalInfo) {
    console.log('code', token, 'personal info', personalInfo);
    const user = await this.userRepository.findByToken(token);
    console.log(user, personalInfo);
  }

  async editProfile(userInfo: User, updatedInfo: UpdateAccountDto) {
    console.log('updated info', updatedInfo);
  }
}
