import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MapsService } from './maps.service';
import { Map } from './entities/map.entity';
import { CreateMapInput } from './dto/create-map.input';
import { UpdateMapInput } from './dto/update-map.input';

@Resolver(() => Map)
export class MapsResolver {
  constructor(private readonly mapsService: MapsService) {}

  @Mutation(() => Map)
  createMap(@Args('createMapInput') createMapInput: CreateMapInput) {
    return this.mapsService.create(createMapInput);
  }

  @Query(() => [Map], { name: 'maps' })
  findAll() {
    return this.mapsService.findAll();
  }

  @Query(() => Map, { name: 'map' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mapsService.findOne(id);
  }

  @Mutation(() => Map)
  updateMap(@Args('updateMapInput') updateMapInput: UpdateMapInput) {
    return this.mapsService.update(updateMapInput.id, updateMapInput);
  }

  @Mutation(() => Map)
  removeMap(@Args('id', { type: () => Int }) id: number) {
    return this.mapsService.remove(id);
  }
}
