import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CreateProductDto, ProductDto } from './products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProductDto })
  async create(@Body() body: CreateProductDto): Promise<ProductDto> {
    return this.productsService.create(body); // ✅ Truyền toàn bộ object
  }

  @Get()
  @ApiOkResponse({ type: [ProductDto] })
  async findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Get('search')
  @ApiOkResponse({ type: [ProductDto] })
  async search(@Query('keyword') keyword: string): Promise<ProductDto[]> {
    return this.productsService.search(keyword);
  }
}
