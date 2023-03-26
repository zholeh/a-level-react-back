import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../../common/interfaces/product';

export class ProductModel implements Product {
  @ApiProperty({ type: String })
  readonly id!: string;

  @ApiProperty({ type: String })
  readonly name!: string;
}
