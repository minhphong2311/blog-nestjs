import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Public()
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':id')
  findDetail(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findDetail(Number(id));
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Req() req: any, @Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    return this.categoryService.create({ ...createCategoryDto });
  }

  @Put(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() updateCategoryDto: UpdateCategoryDto){
    return this.categoryService.update(Number(id), updateCategoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(Number(id));
  }
}
