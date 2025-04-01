import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    return this.prisma.cartItem.create({
      data: { userId, productId, quantity },
    });
  }

  async getCart(userId: number) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        Product: true,
      },
    });
  }

  async removeFromCart(id: number) {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
