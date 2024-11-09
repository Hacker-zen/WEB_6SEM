import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  password: string;

  @ApiProperty()
  @Column()
  fullName: string;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @ApiProperty()
  @Column({
    nullable: true,
    default: null,
  })
  avatarUrl: string;
}
