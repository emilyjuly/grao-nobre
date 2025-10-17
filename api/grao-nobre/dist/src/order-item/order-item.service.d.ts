import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OrderItemService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderItemDto: CreateOrderItemDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): string;
    remove(id: number): string;
}
