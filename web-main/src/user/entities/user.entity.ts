import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/Role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  fullName: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @Column({
    nullable: true,
    default: null,
  })
  avatarUrl: string;
}
