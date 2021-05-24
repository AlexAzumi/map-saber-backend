import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
   * Gets a map information
   */
  async getMap(id: number): Promise<Map> {
    const foundMap = await this.mapRepository.findOne(id);

    if (!foundMap) {
      throw new NotFoundException(['Not found map']);
    }

    return foundMap;
  }

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

  /**
   * Deletes a map from database
   * Note: Only the map creator can delete it (ADMINS will have the permission too later)
   */
  async deleteMap(requestedBy: User, id: number): Promise<Map> {
    const map = await this.mapRepository.findOne(id);

    if (!map) {
      throw new NotFoundException(['Map not found']);
    } else if (map.author['id'] !== requestedBy.id) {
      throw new UnauthorizedException();
    }

    const deletedMap = await this.mapRepository.remove(map);

    return {
      ...deletedMap,
      id,
    };
  }
}
