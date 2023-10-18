import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;

  description: string;

  status: number;
}
