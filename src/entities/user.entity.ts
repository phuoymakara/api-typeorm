import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username?: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'avatar', nullable: true })
  avatar?: string;

  @Column()
  gender?: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isLocked: boolean;

  @Column()
  reason: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' })
  updatedAt: Date;
}
