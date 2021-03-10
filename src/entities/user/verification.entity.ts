import {
  Column,
  Entity,
  BeforeInsert,
  OneToOne,
  RelationId,
  AbstractRepository,
  EntityRepository,
} from 'typeorm';
import { CoreEntity } from 'src/entities/core/core.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';

@Entity()
export class Verification extends CoreEntity {
  @Column()
  token: string;

  @BeforeInsert()
  generateToken(): void {
    this.token = uuidv4();
  }

  // 외래키
  @OneToOne(() => User, (user) => user.verification, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;

  @RelationId((verification: Verification) => verification.user)
  userId: string;
}

// abstract class
@EntityRepository(Verification)
export class VerificationRepository extends AbstractRepository<Verification> {
  async findExistingToken(email: string): Promise<Verification> {
    return await this.manager
      .createQueryBuilder(Verification, 'verification')
      .select(['verification.id', 'verification.userId', 'user.email'])
      .leftJoin('verification.user', 'user')
      .where('user.email = :email', { email })
      .getOneOrFail();
  }
}
