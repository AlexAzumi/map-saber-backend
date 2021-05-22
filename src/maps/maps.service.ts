import { Injectable } from '@nestjs/common';
import { Difficulty } from 'src/enums/difficulty.enum';
// Inputs
import { CreateMapInput } from './dto/create-map.input';
import { UpdateMapInput } from './dto/update-map.input';
// Entities
import { Map } from './entities/map.entity';

@Injectable()
export class MapsService {
  create(createMapInput: CreateMapInput) {
    return 'This action adds a new map';
  }

  findAll(): Map[] {
    return [];
  }

  findOne(id: number): Map {
    return {
      id: 1,
      title: 'Beatiful Song',
      artist: 'Keiichi Okabe',
      duration: 5000,
      likes: 69,
      difficulties: [
        Difficulty.NORMAL,
        Difficulty.EXTREME,
        Difficulty.EXTREME_PLUS,
      ],
      author: {
        id: 1,
        username: 'AlexAzumi',
        email: 'alejandro-hdez115@outlook.com',
        password: 'xd',
        creationDate: new Date(),
        createdMaps: [],
      },
    };
  }

  update(id: number, updateMapInput: UpdateMapInput) {
    return `This action updates a #${id} map`;
  }

  remove(id: number) {
    return `This action removes a #${id} map`;
  }
}
