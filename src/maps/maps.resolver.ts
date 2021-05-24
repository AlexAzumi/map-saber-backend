import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MapsService } from './maps.service';
import { Map } from './entities/map.entity';
import { CreateMapInput } from './dto/create-map.input';
import { UpdateMapInput } from './dto/update-map.input';
import { GQLAuthGuard } from 'src/users/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CtxUser } from '../users/decorators/ctx-user.decorator';

@Resolver(() => Map)
export class MapsResolver {
  constructor(private readonly mapsService: MapsService) {}

  @Query(() => Map, { name: 'map' })
  findMap(@Args('id') id: number): Promise<Map> {
    return this.mapsService.getMap(id);
  }

  @Query(() => [Map])
  getUserMaps(@Args('id') id: number): Promise<Map[]> {
    return this.mapsService.getUserMaps(id);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Map])
  getMyMaps(@CtxUser() user: User) {
    return this.mapsService.getUserMaps(user.id);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Map)
  submitMap(
    @CtxUser() user: User,
    @Args('data') data: CreateMapInput,
  ): Promise<Map> {
    return this.mapsService.submitMap(user, data);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Map)
  deleteMap(@CtxUser() user: User, @Args('id') id: number): Promise<Map> {
    return this.mapsService.deleteMap(user, id);
  }
}
