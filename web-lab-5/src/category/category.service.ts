import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { PageMetaDto } from 'src/pagnition/page-meta.dto';
import { PageOptionsDto } from 'src/pagnition/page-option.dto';
import { PageDto } from 'src/pagnition/page.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return category;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Category>> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take || 0)
      .take(pageOptionsDto.take)
      .leftJoinAndSelect('product.category', 'category');

    const [res, total] = await queryBuilder.getManyAndCount();

    const itemCount = total;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(res, pageMetaDto);
  }

  async findOne(id: string): Promise<Category | undefined> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }

    await this.categoryRepository.save(category);
    return category;
  }

  async delete(id: string): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.delete(category);
  }
}
