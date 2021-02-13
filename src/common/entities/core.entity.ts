import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CoreEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  publishedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// post, feedback
export abstract class PostCoreEntity extends CoreEntity {
  @Column({ type: 'text' })
  description: string;
}
