import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsResolver } from './maps.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Map } from './entities/map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Map])],
  providers: [MapsResolver, MapsService],
})
export class MapsModule {}
