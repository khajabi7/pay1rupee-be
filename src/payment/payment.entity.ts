import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  transactionId: string;

  @Column({ default: 1.0 })
  amount: number;

  @Column({ unique: false, nullable: true })
  status: string;

  @CreateDateColumn({ unique: false, nullable: true })
  createdAt: Date;
}

