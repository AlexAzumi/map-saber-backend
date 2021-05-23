import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrPrivateKey: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1 year',
        },
      }),
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
