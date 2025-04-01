// products.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ required: false })
  imageUrl?: string;
}

export class ProductUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true })
  name: string | null;

  @ApiProperty({ nullable: true })
  createdAt: Date | null;

  @ApiProperty({ nullable: true })
  updatedAt: Date | null;
}

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty()
  price: number;

  @ApiProperty({ nullable: true })
  imageUrl: string | null;

  @ApiProperty()
  userId: number;

  @ApiProperty({ nullable: true })
  createdAt: Date | null;

  @ApiProperty({ nullable: true })
  updatedAt: Date | null;

  @ApiProperty({ type: ProductUserDto })
  User: ProductUserDto;
}
