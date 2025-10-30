import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from 'src/address/address.service';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly addressService: AddressService
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const address = await this.addressService.create({
      ...createOrderDto.address,
      userId: createOrderDto.userId,
    });

    const order = await this.orderService.create({
      ...createOrderDto,
      addressId: address.id,
    });

    return {
      message: 'Pedido realizado com sucesso!',
      orderId: order.id,
      estimatedDelivery: 'Disponível em 20 minutos',
    };
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
