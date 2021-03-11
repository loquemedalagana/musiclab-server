import {
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepository } from 'src/entities/user/user.entity';
import { Verification } from 'src/entities/user/verification.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import {
  UpdateAccountDto,
  AddPersonalInfoDto,
} from './dtos/update-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly userRepository: UserRepository,
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
          'public_profile.avatar',
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

  async createAccount(newMemberInfo: CreateAccountDto): Promise<boolean> {
    const { email, displayName } = newMemberInfo;
    const [user] = await this.userRepository.findByEmalilAndDisplayName(
      email,
      displayName,
    );
    console.log('found user', user);
    if (user) {
      throw new ForbiddenException(`this account already exists`);
    }

    try {
      const newAccount = await this.userRepository.createAccount(newMemberInfo);

      console.log(newAccount);

      // send verification email

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

      // send verification email
      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('internal server error');
    }
  }

  async verifyUser(token: string, personalInfo: AddPersonalInfoDto) {
    console.log('code', token, 'personal info', personalInfo);
    const verificationInfo = await this.userRepository.findByToken(token);
    const { user } = verificationInfo;
    await this.verifications.delete(verificationInfo);
    console.log(user, personalInfo, `the token ${token} will be deleted`);
    const [publicInfo, privateInfo] = await this.userRepository.addPersonalInfo(
      user,
      personalInfo,
    );
    console.log('added personal info', publicInfo, privateInfo);
  }

  async editProfile(userInfo: User, updatedInfo: UpdateAccountDto) {
    console.log('updated info', updatedInfo);
  }
}
