import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        items: {
            id: number;
            price: Prisma.Decimal;
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
        total: Prisma.Decimal;
        status: string;
        addressId: number;
    }>;
    findAll(): Promise<({
        items: {
            id: number;
            price: Prisma.Decimal;
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
        total: Prisma.Decimal;
        status: string;
        addressId: number;
    })[]>;
    findOne(id: number): Prisma.Prisma__OrderClient<{
        id: number;
        createdAt: Date;
        userId: number;
        total: Prisma.Decimal;
        status: string;
        addressId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
