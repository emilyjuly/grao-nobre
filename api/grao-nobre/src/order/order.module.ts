import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressService } from 'src/address/address.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, AddressService],
  imports: [PrismaModule],
})
export class OrderModule {}
