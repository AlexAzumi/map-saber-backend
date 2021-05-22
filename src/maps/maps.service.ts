import { Injectable } from '@nestjs/common';
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
      exampleField: 1,
    };
  }

  update(id: number, updateMapInput: UpdateMapInput) {
    return `This action updates a #${id} map`;
  }

  remove(id: number) {
    return `This action removes a #${id} map`;
  }
}
