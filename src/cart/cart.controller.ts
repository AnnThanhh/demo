import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async addToCart(
    @Body() body: { userId: number; productId: number; quantity: number },
  ) {
    return this.cartService.addToCart(
      body.userId,
      body.productId,
      body.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(parseInt(userId));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async removeFromCart(@Param('id') id: string) {
    return this.cartService.removeFromCart(parseInt(id));
  }
}
