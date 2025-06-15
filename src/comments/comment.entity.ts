import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  comment: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  city: string;

  @Column({ nullable: true })
  profile_picture: string;

  @CreateDateColumn()
  createdAt: Date;
}