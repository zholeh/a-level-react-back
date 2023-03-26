import { ApiProperty } from '@nestjs/swagger';
import { Sort } from '../../../common/interfaces/sort';
import { Category } from '../../../common/interfaces/category';
import { Direction } from '../../../common/enums/direction';

export class CategorySort implements Sort<Category> {
  @ApiProperty({ enum: Direction })
  readonly id?: Direction;

  @ApiProperty({ enum: Direction })
  readonly symbol?: Direction;

  @ApiProperty({ enum: Direction })
  readonly name?: Direction;

  @ApiProperty({ enum: Direction })
  readonly symbol_native?: Direction;

  @ApiProperty({ enum: Direction })
  readonly decimal_digits?: Direction;

  @ApiProperty({ enum: Direction })
  readonly rounding?: Direction;

  @ApiProperty({ enum: Direction })
  readonly name_plural?: Direction;
}
