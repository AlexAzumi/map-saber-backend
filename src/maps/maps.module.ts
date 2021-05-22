import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsResolver } from './maps.resolver';

@Module({
  providers: [MapsResolver, MapsService]
})
export class MapsModule {}
