import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CategoryModel } from './model';

export class PartialUpdateCategory extends PartialType(CategoryModel) {
  @ApiProperty({ type: String, required: true })
  readonly id!: string;
}
