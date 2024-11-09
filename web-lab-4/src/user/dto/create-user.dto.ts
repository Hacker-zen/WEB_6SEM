import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user/enum/role.enum';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  avatarUrl: string;
}
