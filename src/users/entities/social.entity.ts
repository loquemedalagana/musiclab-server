import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Social {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
