import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { OrderService } from 'src/order/order.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private orderService: OrderService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const order = await this.orderService.findOne(createPaymentDto.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const payment = this.paymentRepository.create(createPaymentDto);
    payment.order = order;
    await this.paymentRepository.save(payment);
    return payment;
  }

  async findAll(): Promise<Payment[]> {
    const queryBuilder = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.order', 'order');

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Payment> {
    const queryBuilder = await this.paymentRepository
      .createQueryBuilder('payment')
      .where('payment.id = :id', { id: id })
      .leftJoinAndSelect('payment.order', 'order');

    return await queryBuilder.getOne();
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (updatePaymentDto.amount) {
      payment.amount = updatePaymentDto.amount;
    }

    if (updatePaymentDto.orderId) {
      const order = await this.orderService.findOne(updatePaymentDto.orderId);
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      payment.order = order;
    }

    if (updatePaymentDto.paymentMethod) {
      payment.paymentMethod = updatePaymentDto.paymentMethod;
    }

    if (updatePaymentDto.paymentStatus) {
      payment.paymentStatus = updatePaymentDto.paymentStatus;
    }

    await this.paymentRepository.save(payment);
    return payment;
  }

  async delete(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Order not found');
    }

    await this.paymentRepository.delete(payment);
  }
}
