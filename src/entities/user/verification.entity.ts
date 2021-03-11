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

@Entity()
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  token: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateToken(): void {
    this.token = uuidv4();
  }

  // 외래키
  @OneToOne(() => User, (user) => user.verification)
  user: User;
}

// abstract class
@EntityRepository(Verification)
export class VerificationRepository extends AbstractRepository<Verification> {
  async generateNewToken(userInfo: User): Promise<Verification> {
    const existingToken = await this.manager.findOneOrFail(Verification, {
      user: userInfo,
    });
    if (existingToken) {
      await this.manager.delete(Verification, existingToken);
    }
    const newVerification = await this.manager.create(Verification, {
      user: userInfo,
    });
    return await this.manager.save(Verification, newVerification);
  }

  async findExistingToken(email: string): Promise<Verification> {
    return await this.manager
      .createQueryBuilder(Verification, 'verification')
      .select(['verification.id', 'verification.userId', 'user.email'])
      .leftJoin('verification.user', 'user')
      .where('user.email = :email', { email })
      .getOneOrFail();
  }
}
