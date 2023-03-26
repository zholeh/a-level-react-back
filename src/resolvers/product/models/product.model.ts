import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from '../../../common/interfaces/product';

@ObjectType()
export class ProductModel implements Product {
  @Field(() => String)
  readonly name!: string;

  @Field(() => ID)
  readonly id!: string;
}
