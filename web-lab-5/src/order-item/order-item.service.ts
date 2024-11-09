import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { PageMetaDto } from 'src/pagnition/page-meta.dto';
import { PageOptionsDto } from 'src/pagnition/page-option.dto';
import { PageDto } from 'src/pagnition/page.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productService: ProductService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const product = await this.productService.findOne(
      createOrderItemDto.productId,
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    orderItem.product = product;

    await this.orderItemRepository.save(orderItem);
    return orderItem;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<OrderItem>> {
    const queryBuilder = this.orderItemRepository
      .createQueryBuilder('oderItem')
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take || 0)
      .take(pageOptionsDto.take)
      .leftJoinAndSelect('oderItem.order', 'order')
      .leftJoinAndSelect('oderItem.product', 'product');

    const [res, total] = await queryBuilder.getManyAndCount();

    const itemCount = total;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(res, pageMetaDto);
  }

  async findOne(id: string): Promise<OrderItem | undefined> {
    return await this.orderItemRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) {
      throw new NotFoundException('Order item not found');
    }

    // Handle optional product update
    if (updateOrderItemDto.productId) {
      const product = await this.productService.findOne(
        updateOrderItemDto.productId,
      );
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      orderItem.product = product;
    }

    if (updateOrderItemDto.quantity) {
      orderItem.quantity = updateOrderItemDto.quantity;
    }

    await this.orderItemRepository.save(orderItem);
    return orderItem;
  }

  async delete(id: string): Promise<void> {
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) {
      throw new NotFoundException('Order item not found');
    }

    await this.orderItemRepository.delete(orderItem);
  }
}
