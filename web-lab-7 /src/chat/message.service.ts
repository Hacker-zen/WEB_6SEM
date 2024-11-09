import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private userService: UserService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    if (createMessageDto.userId) {
      const user = await this.userService.findById(createMessageDto.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const message = this.messageRepository.create(createMessageDto);
      message.user = user;

      await this.messageRepository.save(message);
      return message;
    }

    const message = this.messageRepository.create(createMessageDto);

    await this.messageRepository.save(message);
    return message;
  }

  async findAll(): Promise<Message[]> {
    const queryBuilder = this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'user');

    return await queryBuilder.getMany();
  }
}
