import { Injectable, BadRequestException } from '@nestjs/common';

import { AuctionResponse } from './auctions.dto';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class AuctionsService {
  constructor(private prisma: PrismaService) {}

  async createAuction(
    productId: number,
    startPrice: number,
    endTime: Date,
  ): Promise<AuctionResponse> {
    return this.prisma.auction.create({
      data: { productId, startPrice, endTime },
    });
  }

  async placeBid(
    auctionId: number,
    userId: number,
    amount: number,
  ): Promise<AuctionResponse> {
    const auction = await this.prisma.auction.findUnique({
      where: { id: auctionId },
    });
    if (!auction || new Date() > auction.endTime) {
      throw new BadRequestException('Auction has ended or does not exist');
    }
    if (auction.currentBid && amount <= auction.currentBid) {
      throw new BadRequestException('Bid must be higher than current bid');
    }
    await this.prisma.auction.update({
      where: { id: auctionId },
      data: { currentBid: amount },
    });
    // Trả về auction với include đúng tên quan hệ 'product'
    return this.prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        Product: true,
        Bid: {
          include: {
            User: true,
          },
        },
      },
    }) as Promise<AuctionResponse>;
  }

  async getAuction(auctionId: number): Promise<AuctionResponse> {
    const auction = await this.prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        Product: true,
        Bid: {
          include: {
            User: true,
          },
        },
      },
    });
    if (!auction) {
      throw new BadRequestException('Auction not found');
    }
    return auction;
  }
}
