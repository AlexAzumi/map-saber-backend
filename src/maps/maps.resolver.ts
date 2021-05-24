import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MapsService } from './maps.service';
import { Map } from './entities/map.entity';
import { CreateMapInput } from './dto/create-map.input';
import { UpdateMapInput } from './dto/update-map.input';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from 'src/users/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CtxUser } from '../users/decorators/ctx-user.decorator';

@Resolver(() => Map)
export class MapsResolver {
  constructor(private readonly mapsService: MapsService) {}

  @Query(() => [Map])
  getUserMaps(@Args('id') id: number): Promise<Map[]> {
    return this.mapsService.getUserMaps(id);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Map])
  getMyMaps(@CtxUser() user: User) {
    return this.mapsService.getUserMaps(user.id);
  }

  @Mutation(() => Map)
  submitMap(@CtxUser() user: User, @Args('data') data: CreateMapInput) {}

  // @Mutation(() => Map)
  // createMap(@Args('createMapInput') createMapInput: CreateMapInput) {
  //   return this.mapsService.create(createMapInput);
  // }

  // @Query(() => [Map], { name: 'maps' })
  // findAll() {
  //   return this.mapsService.findAll();
  // }

  // @Query(() => Map, { name: 'map' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.mapsService.findOne(id);
  // }

  // @Mutation(() => Map)
  // updateMap(@Args('updateMapInput') updateMapInput: UpdateMapInput) {
  //   return this.mapsService.update(updateMapInput.id, updateMapInput);
  // }

  // @Mutation(() => Map)
  // removeMap(@Args('id', { type: () => Int }) id: number) {
  //   return this.mapsService.remove(id);
  // }
}
