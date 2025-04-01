import { ApiProperty } from '@nestjs/swagger';

// DTO cho input
export interface CreateAuctionDto {
  productId: number;
  startPrice: number;
  endTime: string;
}

export interface PlaceBidDto {
  auctionId: number;
  userId: number;
  amount: number;
}

// Class cho Swagger
export class AuctionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  startPrice: number;

  @ApiProperty({ required: false })
  currentBid: number | null;

  @ApiProperty()
  endTime: Date;

  @ApiProperty({ required: false }) // Cho phép null
  createdAt: Date | null;

  @ApiProperty({ required: false })
  product?: {
    id: number;
    title: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    userId: number;
  };

  @ApiProperty({ required: false, type: () => [BidResponseDto] })
  bids?: BidResponseDto[];
}

export class BidResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  auctionId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  amount: number;

  @ApiProperty({ required: false }) // Cho phép null
  createdAt: Date | null;
}

// Interface cho TypeScript
export interface AuctionResponse {
  id: number;
  productId: number;
  startPrice: number;
  currentBid: number | null;
  endTime: Date;
  createdAt: Date | null; // Sửa thành Date | null
  product?: {
    id: number;
    title: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    userId: number;
  };
  bids?: Array<{
    id: number;
    auctionId: number;
    userId: number;
    amount: number;
    createdAt: Date | null; // Sửa thành Date | null
  }>;
}
