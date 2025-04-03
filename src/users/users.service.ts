import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from '@prisma/client'; // ✅ Dùng Prisma-generated type

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const { email, password, ...rest } = data;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ salt rounds = 10 là hợp lý

    const userData = {
      email,
      password: hashedPassword,
      ...rest,
      dob: rest.dob ? new Date(rest.dob) : undefined,
    };

    return this.prisma.user.create({ data: userData });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const { password, ...rest } = data;

    const updateData: Partial<User> = { ...rest };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }
}
