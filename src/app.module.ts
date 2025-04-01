import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { UploadsModule } from './upload/uploads.module';
import { CartModule } from './cart/cart.module';
import { AuctionsModule } from './auctions/auctions.module';
import { PrismaService } from './prisma/prisma.services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ProductsModule,
    UploadsModule,
    CartModule,
    AuctionsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
