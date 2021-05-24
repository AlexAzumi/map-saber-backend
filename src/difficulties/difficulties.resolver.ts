import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DifficultiesService } from './difficulties.service';
import { Difficulty } from './entities/difficulty.entity';
import { CreateDifficultyInput } from './dto/create-difficulty.input';
import { UpdateDifficultyInput } from './dto/update-difficulty.input';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from '../users/jwt-auth.guard';

@Resolver(() => Difficulty)
export class DifficultiesResolver {
  constructor(private readonly difficultiesService: DifficultiesService) {}

  @Query(() => [Difficulty], { name: 'difficulties' })
  findAll() {
    return this.difficultiesService.findAll();
  }

  @Query(() => Difficulty, { name: 'difficulty' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.difficultiesService.findOne(id);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Difficulty)
  createDifficulty(
    @Args('data') data: CreateDifficultyInput,
  ): Promise<Difficulty> {
    return this.difficultiesService.create(data);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Difficulty)
  updateDifficulty(@Args('updateDifficultyInput') data: UpdateDifficultyInput) {
    return this.difficultiesService.update(data.id, data);
  }
}
