import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  invalidCreds = 'Credentials are not valid';
  constructor(private readonly prismaSerice: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.prismaSerice.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });
  }

  async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.prismaSerice.user.findFirstOrThrow({
        where: { email: createUserDto.email },
      });
    } catch (err) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }

  async verifyUser(email: string, password: string) {
    const user = await this.prismaSerice.user.findFirstOrThrow({
      where: { email },
    });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) throw new UnauthorizedException(this.invalidCreds);
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.prismaSerice.user.findUniqueOrThrow({
      where: { id: +getUserDto.id },
    });
  }
}
