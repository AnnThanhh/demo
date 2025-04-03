import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { AddToCartDto } from './cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: AddToCartDto })
  async addToCart(@Body() body: AddToCartDto) {
    return this.cartService.addToCart(
      body.userId,
      body.productId,
      body.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':userId')
  @ApiParam({ name: 'userId', type: Number })
  async getCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getCart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  async removeFromCart(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeFromCart(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('clear/:userId')
  @ApiParam({ name: 'userId', type: Number })
  async clearCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.clearCart(userId);
  }
}
