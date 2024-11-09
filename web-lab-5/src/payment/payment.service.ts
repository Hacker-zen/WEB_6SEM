import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { OrderService } from 'src/order/order.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/pagnition/page-option.dto';
import { PageDto } from 'src/pagnition/page.dto';
import { PageMetaDto } from 'src/pagnition/page-meta.dto';

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

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Payment>> {
    const queryBuilder = await this.paymentRepository
      .createQueryBuilder('payment')
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take || 0)
      .take(pageOptionsDto.take)
      .leftJoinAndSelect('payment.order', 'order');

    const [res, total] = await queryBuilder.getManyAndCount();

    const itemCount = total;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(res, pageMetaDto);
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
