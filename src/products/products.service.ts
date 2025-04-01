import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateProductDto, ProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<ProductDto> {
    return this.prisma.product.create({
      data,
      include: {
        User: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<ProductDto[]> {
    return this.prisma.product.findMany({
      include: {
        User: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async search(keyword: string): Promise<ProductDto[]> {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      },
      include: {
        User: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }
}
