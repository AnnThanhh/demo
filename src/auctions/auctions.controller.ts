import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {
  CreateAuctionDto,
  PlaceBidDto,
  AuctionResponse,
  AuctionResponseDto,
} from './auctions.dto';

@ApiTags('auctions')
@Controller('auctions')
export class AuctionsController {
  constructor(private auctionsService: AuctionsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new auction' })
  @ApiResponse({
    status: 201,
    description: 'Auction created',
    type: AuctionResponseDto, // Dùng class cho Swagger
  })
  async createAuction(
    @Body() body: CreateAuctionDto,
  ): Promise<AuctionResponse> {
    return this.auctionsService.createAuction(
      body.productId,
      body.startPrice,
      new Date(body.endTime),
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('bid')
  @ApiOperation({ summary: 'Place a bid on an auction' })
  @ApiResponse({
    status: 201,
    description: 'Bid placed',
    type: AuctionResponseDto, // Dùng class cho Swagger
  })
  async placeBid(@Body() body: PlaceBidDto): Promise<AuctionResponse> {
    return this.auctionsService.placeBid(
      body.auctionId,
      body.userId,
      body.amount,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get auction details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Auction details',
    type: AuctionResponseDto, // Dùng class cho Swagger
  })
  async getAuction(@Param('id') id: string): Promise<AuctionResponse> {
    return this.auctionsService.getAuction(parseInt(id));
  }
}
