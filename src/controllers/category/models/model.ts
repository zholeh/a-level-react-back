import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../common/interfaces/category';

export class CategoryModel implements Category {
  @ApiProperty({ type: String })
  readonly id!: string;

  @ApiProperty({ type: String })
  readonly name!: string;
}
