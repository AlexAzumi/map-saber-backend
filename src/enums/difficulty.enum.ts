import { registerEnumType } from '@nestjs/graphql';

export enum Difficulty {
  EASY,
  NORMAL,
  HARD,
  EXTREME,
  EXTREME_PLUS,
}

registerEnumType(Difficulty, {
  name: 'Difficulty',
});
