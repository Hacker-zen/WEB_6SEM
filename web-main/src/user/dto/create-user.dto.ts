import { Role } from '../enum/Role.enum';

export class CreateUserDto {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  role: Role;
  avatarUrl: string;
}
