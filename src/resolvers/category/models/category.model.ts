import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Category } from '../../../common/interfaces/category';

@ObjectType()
export class CategoryModel implements Category {
  @Field(() => String)
  readonly name!: string;

  @Field(() => ID)
  readonly id!: number;
}
