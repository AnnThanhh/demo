import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const existing = await this.prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: (existing.quantity ?? 0) + quantity,
        },
      });
    }

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
    const existing = await this.prisma.cartItem.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Cart item not found');
    }
    return this.prisma.cartItem.delete({ where: { id } });
  }

  async clearCart(userId: number) {
    return this.prisma.cartItem.deleteMany({ where: { userId } });
  }
}
