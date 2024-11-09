import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageMetaDto } from 'src/pagnition/page-meta.dto';
import { PageOptionsDto } from 'src/pagnition/page-option.dto';
import { PageDto } from 'src/pagnition/page.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.email', pageOptionsDto.order)
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take || 0)
      .take(pageOptionsDto.take);

    const [res, total] = await queryBuilder.getManyAndCount();

    const itemCount = total;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(res, pageMetaDto);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id });

    if (updateUserDto.email) {
      existingUser.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      existingUser.password = updateUserDto.password;
    }

    if (updateUserDto.fullName) {
      existingUser.fullName = updateUserDto.fullName;
    }

    if (updateUserDto.phoneNumber) {
      existingUser.phoneNumber = updateUserDto.phoneNumber;
    }

    if (updateUserDto.avatarUrl) {
      existingUser.avatarUrl = updateUserDto.avatarUrl;
    }

    if (updateUserDto.role) {
      existingUser.role = updateUserDto.role;
    }

    return await this.userRepository.save(existingUser);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
