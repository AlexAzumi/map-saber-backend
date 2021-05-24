import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER,
  ADMIN,
}

registerEnumType(Role, {
  name: 'Roles',
});
