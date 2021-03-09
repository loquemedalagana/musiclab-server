import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class TagCoreEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  publishedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
