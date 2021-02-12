import { Column } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { IsString } from 'class-validator';

export class Tag extends CoreEntity {
  @Column({ nullable: true })
  @IsString()
  thumbnail: string;
}
