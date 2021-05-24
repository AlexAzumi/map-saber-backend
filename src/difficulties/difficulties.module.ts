import { Module } from '@nestjs/common';
import { DifficultiesService } from './difficulties.service';
import { DifficultiesResolver } from './difficulties.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Difficulty } from './entities/difficulty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Difficulty])],
  providers: [DifficultiesResolver, DifficultiesService],
})
export class DifficultiesModule {}
