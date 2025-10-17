import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPaymentDto: CreatePaymentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePaymentDto: UpdatePaymentDto): string;
    remove(id: number): string;
}
