import {
  Column,
  Entity,
  BeforeInsert,
  OneToOne,
  AbstractRepository,
  EntityRepository,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { ONE_HOUR } from 'src/common/constants/common.constants';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  expiredAt: Date;

  @Column()
  token: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateToken(): void {
    this.token = uuidv4();
  }

  @BeforeInsert()
  @BeforeUpdate()
  getExpiredDate(): void {
    this.expiredAt = new Date(Date.now() + ONE_HOUR);
  }

  isExpired() {
    return Date.now() > this.expiredAt.getMilliseconds();
  }

  // 외래키
  @OneToOne(() => User, (user) => user.verification)
  user: User;
}

// abstract class
@EntityRepository(Verification)
export class VerificationRepository extends AbstractRepository<Verification> {
  async findExistingToken(email: string): Promise<Verification> {
    return await this.manager
      .createQueryBuilder(Verification, 'verification')
      .select(['verification.id', 'user.email'])
      .leftJoin('verification.user', 'user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async generateNewToken(userInfo: User): Promise<Verification> {
    const existingToken = await this.findExistingToken(userInfo.email);
    console.log('existing token', existingToken);
    if (existingToken) {
      await this.manager.delete(Verification, existingToken);
    }

    const newVerification = await this.manager.create(Verification, {
      user: userInfo,
    });
    return await this.manager.save(Verification, newVerification);
  }
}
