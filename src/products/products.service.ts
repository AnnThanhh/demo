import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateProductDto, ProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<ProductDto> {
    console.log(data); // Log the data being passed in
    return this.prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        userId: data.userId,
        imageUrl: data.imageUrl || null,
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
