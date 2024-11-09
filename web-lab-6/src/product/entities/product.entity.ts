import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ nullable: true })
  @Column()
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty()
  @Column('decimal')
  price: number;

  @ApiProperty()
  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: Category;
}
