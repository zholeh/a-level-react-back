import {
  Args,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductService } from '../../services/product.service';
import { ProductInput } from './models/product.input';
import { ProductModel } from './models/product.model';
import { PartialUpdateProductInput } from './models/partialUpdate-product.input';
import { ProductSort } from './models/sort';
import { ProductWhere } from './models/where';

@ObjectType()
export class ProductQuery {
  @Field(() => [ProductModel], { nullable: true })
  readonly findAll!: ProductModel[];
  @Field(() => ProductModel, { nullable: true })
  readonly findOne!: ProductModel;
}

@Resolver(ProductQuery)
export class ProductQueryResolver {
  constructor(private readonly service: ProductService) {}

  @Query(() => ProductQuery)
  product(): boolean {
    return true;
  }

  @ResolveField(() => [ProductModel])
  async findAll(
    @Args('where', { nullable: true }) where?: ProductWhere,
    @Args('sort', { nullable: true }) sort?: ProductSort,
  ): Promise<ProductModel[]> {
    return this.service.findAll(where, sort);
  }

  @ResolveField(() => ProductModel)
  async findOne(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<ProductModel> {
    return this.service.findOne(id);
  }
}

@ObjectType()
export class ProductMutation {
  @Field(() => ProductModel, { nullable: true })
  readonly create!: ProductModel;

  @Field({ nullable: true })
  readonly update!: ProductModel;

  @Field({ nullable: true })
  readonly delete!: boolean;
}

@Resolver(ProductMutation)
export class ProductMutationResolver {
  constructor(private readonly service: ProductService) {}

  @Mutation(() => ProductMutation)
  product(): boolean {
    return true;
  }

  @ResolveField(() => ProductModel)
  async create(@Args('input') input: ProductInput): Promise<ProductModel> {
    return this.service.create(input);
  }

  @ResolveField(() => ProductModel)
  async update(@Args('input') input: ProductInput): Promise<ProductModel> {
    return this.service.update(input);
  }

  @ResolveField(() => ProductModel)
  async partialUpdate(
    @Args('input') input: PartialUpdateProductInput,
  ): Promise<ProductModel> {
    return this.service.partialUpdate(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.service.delete(id);
  }
}
