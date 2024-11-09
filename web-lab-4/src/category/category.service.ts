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

  findOne(id: string) {
    return `This action returns a #${id} Category`;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} Category`;
  }

  remove(id: string) {
    return `This action removes a #${id} Category`;
  }
}
