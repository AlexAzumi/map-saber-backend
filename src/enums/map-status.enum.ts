import { registerEnumType } from '@nestjs/graphql';

export enum MapStatus {
  UNRANKED,
  QUALIFIED,
  RANKED,
}

registerEnumType(MapStatus, {
  name: 'MapStatus',
});
