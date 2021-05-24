import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDifficultyInput } from './dto/create-difficulty.input';
import { UpdateDifficultyInput } from './dto/update-difficulty.input';
import { Difficulty } from './entities/difficulty.entity';

@Injectable()
export class DifficultiesService {
  constructor(
    @InjectRepository(Difficulty)
    private readonly difficultyRepository: Repository<Difficulty>,
  ) {}
  /**
   * Adds a new difficulty to the database
   */
  async create(data: CreateDifficultyInput): Promise<Difficulty> {
    return await this.difficultyRepository.save({
      name: data.name,
    });
  }

  /**
   * Returns all the available difficulties
   */
  async findAll(): Promise<Difficulty[]> {
    return await this.difficultyRepository.find();
  }

  /**
   * Finds a difficulty by its ID
   */
  async findOne(id: number): Promise<Difficulty> {
    const foundDifficulty = await this.difficultyRepository.findOne(id);

    if (!foundDifficulty) {
      throw new NotFoundException(['Difficulty not found']);
    }

    return foundDifficulty;
  }

  /**
   * Updates a difficulty name
   */
  async update(id: number, data: UpdateDifficultyInput) {
    const difficulty = this.difficultyRepository.findOne(id);

    if (!difficulty) {
      throw new NotFoundException(['Difficulty not found']);
    }

    return await this.difficultyRepository.update(
      {
        id,
      },
      {
        name: data.name,
      },
    );
  }
}
