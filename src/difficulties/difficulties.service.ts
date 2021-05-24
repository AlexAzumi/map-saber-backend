import { Injectable } from '@nestjs/common';
import { CreateDifficultyInput } from './dto/create-difficulty.input';
import { UpdateDifficultyInput } from './dto/update-difficulty.input';

@Injectable()
export class DifficultiesService {
  create(createDifficultyInput: CreateDifficultyInput) {
    return 'This action adds a new difficulty';
  }

  findAll() {
    return `This action returns all difficulties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} difficulty`;
  }

  update(id: number, updateDifficultyInput: UpdateDifficultyInput) {
    return `This action updates a #${id} difficulty`;
  }

  remove(id: number) {
    return `This action removes a #${id} difficulty`;
  }
}
