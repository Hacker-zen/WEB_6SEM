import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemService } from 'src/order-item/order-item.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { PageMetaDto } from 'src/pagnition/page-meta.dto';
import { PageOptionsDto } from 'src/pagnition/page-option.dto';
import { PageDto } from 'src/pagnition/page.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private userService: UserService,
    private orderItemService: OrderItemService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findById(createOrderDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = this.orderRepository.create(createOrderDto);
    order.user = user;
    order.totalPrice = 0; // Initialize totalPrice

    // Create order items and update totalPrice
    const createdOrderItems = await Promise.all(
      createOrderDto.orderItems.map(async (orderItemDto) => {
        const orderItem = await this.orderItemService.create({
          ...orderItemDto,
          orderId: order.id, // Assign orderId to each order item
        });
        order.totalPrice += orderItem.product.price * orderItem.quantity;
        return orderItem;
      }),
    );
    order.orderItems = createdOrderItems;

    await this.orderRepository.save(order);
    return order;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Order>> {
    const queryBuilder = await this.orderRepository
      .createQueryBuilder('order')
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take || 0)
      .take(pageOptionsDto.take)
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product');

    const [res, total] = await queryBuilder.getManyAndCount();

    const itemCount = total;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(res, pageMetaDto);
  }

  async findOne(id: string): Promise<Order | undefined> {
    const queryBuilder = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.id = :id', { id: id })
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product');

    return await queryBuilder.getOne();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Handle optional user update
    if (updateOrderDto.userId) {
      const user = await this.userService.findById(updateOrderDto.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      order.user = user;
    }

    // Handle order items updates
    if (updateOrderDto.orderItems) {
      await Promise.all(
        updateOrderDto.orderItems.map(async (orderItemDto) => {
          const existingItemLine = order.orderItems.find(
            (item) => item.product.id === orderItemDto.productId,
          );

          if (existingItemLine) {
            // Update existing order item
            await this.orderItemService.update(
              existingItemLine.id,
              orderItemDto,
            );
          } else {
            // Create new order item
            const newOrderItem = await this.orderItemService.create({
              ...orderItemDto,
              orderId: order.id,
            });
            order.orderItems.push(newOrderItem);
          }
        }),
      );
    }

    order.totalPrice = order.orderItems.reduce(
      (acc, orderItem) => acc + orderItem.product.price * orderItem.quantity,
      0,
    );

    await this.orderRepository.save(order);
    return order;
  }

  async delete(id: string): Promise<void> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderRepository.delete(order);
  }
}
