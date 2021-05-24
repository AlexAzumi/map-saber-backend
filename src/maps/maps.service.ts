import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Inputs
import { CreateMapInput } from './dto/create-map.input';
import { UpdateMapInput } from './dto/update-map.input';
// Entities
import { Map } from './entities/map.entity';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(Map) private readonly mapRepository: Repository<Map>,
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

  async submitMap() {}

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
