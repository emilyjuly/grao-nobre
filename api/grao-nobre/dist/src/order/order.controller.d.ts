import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AddressService } from 'src/address/address.service';
export declare class OrderController {
    private readonly orderService;
    private readonly addressService;
    constructor(orderService: OrderService, addressService: AddressService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        orderId: number;
        estimatedDelivery: string;
    }>;
    findAll(): Promise<({
        items: {
            id: number;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: number;
            orderId: number;
        }[];
        payment: {
            id: number;
            status: string;
            type: string;
            orderId: number;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        total: import("@prisma/client/runtime/library").Decimal;
        status: string;
        addressId: number;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__OrderClient<{
        id: number;
        createdAt: Date;
        userId: number;
        total: import("@prisma/client/runtime/library").Decimal;
        status: string;
        addressId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
