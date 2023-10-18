import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findDetail(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id: id },
    });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const res = await this.categoryRepository.save({ ...createCategoryDto });

      return await this.categoryRepository.findOneBy({ id: res.id });
    } catch (error) {
      throw new HttpException(
        'Can not create category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number,updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
