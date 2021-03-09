import { Column, Entity, BeforeInsert } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Verification extends CoreEntity {
  @Column()
  code: string;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
