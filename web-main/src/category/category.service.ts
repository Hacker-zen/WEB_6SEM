import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new Category';
  }

  findAll() {
    return `This action returns all Category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} Category`;
  }

  remove(id: number) {
    return `This action removes a #${id} Category`;
  }
}
