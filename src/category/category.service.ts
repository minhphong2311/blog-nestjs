import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  async findAll(query: FilterCategoryDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 5;
    const search = query.search || '';

    const skip = (page - 1) * items_per_page;
    const [res, total] = await this.categoryRepository.findAndCount({
      where: [
        {
          name: Like('%' + search + '%'),
        },
        {
          description: Like('%' + search + '%'),
        },
      ],
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
    });

    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
    // return await this.categoryRepository.find();
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

  async multipleDelete(ids: string[]): Promise<DeleteResult> {
    return await this.categoryRepository.delete({ id: In(ids) });
  }
}
