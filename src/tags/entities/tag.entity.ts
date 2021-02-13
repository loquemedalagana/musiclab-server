import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsString } from 'class-validator';

@Entity()
export class Tag extends CoreEntity {
  @Column({ nullable: true })
  @IsString()
  thumbnail: string;
}
