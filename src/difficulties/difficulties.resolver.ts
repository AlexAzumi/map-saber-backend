import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DifficultiesService } from './difficulties.service';
import { Difficulty } from './entities/difficulty.entity';
import { CreateDifficultyInput } from './dto/create-difficulty.input';
import { UpdateDifficultyInput } from './dto/update-difficulty.input';

@Resolver(() => Difficulty)
export class DifficultiesResolver {
  constructor(private readonly difficultiesService: DifficultiesService) {}

  @Mutation(() => Difficulty)
  createDifficulty(@Args('createDifficultyInput') createDifficultyInput: CreateDifficultyInput) {
    return this.difficultiesService.create(createDifficultyInput);
  }

  @Query(() => [Difficulty], { name: 'difficulties' })
  findAll() {
    return this.difficultiesService.findAll();
  }

  @Query(() => Difficulty, { name: 'difficulty' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.difficultiesService.findOne(id);
  }

  @Mutation(() => Difficulty)
  updateDifficulty(@Args('updateDifficultyInput') updateDifficultyInput: UpdateDifficultyInput) {
    return this.difficultiesService.update(updateDifficultyInput.id, updateDifficultyInput);
  }

  @Mutation(() => Difficulty)
  removeDifficulty(@Args('id', { type: () => Int }) id: number) {
    return this.difficultiesService.remove(id);
  }
}
