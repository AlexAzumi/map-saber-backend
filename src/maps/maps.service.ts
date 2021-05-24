import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Difficulty } from '../difficulties/entities/difficulty.entity';
import { MapStatus } from '../enums/map-status.enum';
import { User } from '../users/entities/user.entity';
// Inputs
import { CreateMapInput } from './dto/create-map.input';
import { UpdateMapInput } from './dto/update-map.input';
// Entities
import { Map } from './entities/map.entity';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(Map) private readonly mapRepository: Repository<Map>,
    @InjectRepository(Difficulty)
    private readonly difficultyRepository: Repository<Difficulty>,
  ) {}

  /**
   * Gets and returns all the maps that a user has created
   */
  async getUserMaps(id: number): Promise<Map[]> {
    return this.mapRepository.find({
      where: {
        author: {
          id,
        },
      },
    });
  }

  /**
   * Saves a new map in database
   */
  async submitMap(author: User, data: CreateMapInput): Promise<Map> {
    const difficulties = await this.difficultyRepository.findByIds(
      data.difficulties,
    );

    if (difficulties.length != data.difficulties.length) {
      throw new BadRequestException(['Invalid difficulties']);
    }

    const newMap = {
      ...data,
      author: author.id,
      status: MapStatus.UNRANKED,
      difficulties,
    };

    return await this.mapRepository.save(newMap);
  }

  // create(createMapInput: CreateMapInput) {
  //   return 'This action adds a new map';
  // }
  // findAll(): Map[] {
  //   return [];
  // }
  // findOne(id: number): Map {
  //   return {
  //     id: 1,
  //     title: 'Beatiful Song',
  //     artist: 'Keiichi Okabe',
  //     duration: 5000,
  //     likes: 69,
  //     difficulties: [
  //       Difficulty.NORMAL,
  //       Difficulty.EXTREME,
  //       Difficulty.EXTREME_PLUS,
  //     ],
  //     author: {
  //       id: 1,
  //       username: 'AlexAzumi',
  //       email: 'alejandro-hdez115@outlook.com',
  //       password: 'xd',
  //       creationDate: new Date(),
  //       createdMaps: [],
  //     },
  //   };
  // }
  // update(id: number, updateMapInput: UpdateMapInput) {
  //   return `This action updates a #${id} map`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} map`;
  // }
}
