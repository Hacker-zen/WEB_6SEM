import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enum/role.enum';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsOptional()
  avatarUrl: string;
}
