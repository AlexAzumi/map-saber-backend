import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/hashPassword.helper';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user in the database
   */
  async create(createUserInput: CreateUserInput): Promise<User> {
    const { username, email, password, repeatPassword } = createUserInput;

    if (password !== repeatPassword) {
      throw new BadRequestException(['Passwords do not match']);
    }

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new BadRequestException(['Username or emal is already taken']);
    }

    const newUser: User = {
      id: null,
      username,
      email,
      password: await hashPassword(repeatPassword),
      creationDate: new Date(),
    };

    return await this.userRepository.save(newUser);
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
}
