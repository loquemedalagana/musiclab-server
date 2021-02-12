import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';

export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsString()
  thumbnail: string;
}
