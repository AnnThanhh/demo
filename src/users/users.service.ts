import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto, UserWithPassword } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserWithPassword> {
    const { password, email, name } = data;

    // Ép kiểu rõ ràng để tránh lỗi ESLint
    const safePassword: string = password;
    const hashedPassword = await bcrypt.hash(safePassword, 10);

    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<UserWithPassword | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserWithPassword> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
