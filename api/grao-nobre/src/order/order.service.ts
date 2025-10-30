import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, addressId, total, items, paymentType } = createOrderDto;

    const order = await this.prisma.order.create({
      data: {
        total: new Prisma.Decimal(total),
        status: 'Pendente',
        user: { connect: { id: userId } },
        address: { connect: { id: addressId } },
        items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            product: { connect: { id: item.id } },
          })),
        },
        payment: {
          create: {
            type: paymentType,
            status: 'Pendente',
          },
        },
      },
      include: {
        items: true,
        payment: true,
      },
    });

    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({ include: { items: true, payment: true } });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
