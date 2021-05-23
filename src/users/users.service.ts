import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isSamePassword, hashPassword } from 'src/helpers/hashPassword.helper';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserToken } from './entities/user-token.entity';
import { User } from './entities/user.entity';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Creates a new user in the database
   */
  async create(createUserInput: CreateUserInput): Promise<UserToken> {
    const { username, email, password } = createUserInput;

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new BadRequestException(['Username or email is already taken']);
    }

    const newUser: User = {
      id: null,
      username,
      email,
      password: await hashPassword(password),
      creationDate: new Date(),
    };

    const userCreated = await this.userRepository.save(newUser);

    const payload: JwtPayload = {
      username: newUser.username,
      sub: newUser.id,
    };

    return {
      token: this.jwtService.sign(payload),
      user: userCreated,
    };
  }

  /**
   * Gets all the users available in database
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Retreives a users data searched by their ID
   */
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * Validates the user's credentials
   */
  async login(data: LoginUserInput): Promise<UserToken> {
    const user = await this.userRepository.findOne({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new BadRequestException(['User does not exists']);
    }

    if (!(await isSamePassword(data.password, user.password))) {
      throw new UnauthorizedException(['Invalid credentials']);
    }

    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
