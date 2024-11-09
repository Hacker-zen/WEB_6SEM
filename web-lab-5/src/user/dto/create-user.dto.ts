import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user/enum/role.enum';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

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
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsOptional()
  avatarUrl: string;
}
