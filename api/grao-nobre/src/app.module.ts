import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [PrismaModule, UsersModule, AddressModule, ProductModule, OrderModule, OrderItemModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
