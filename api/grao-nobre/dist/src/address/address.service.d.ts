import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AddressService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAddressDto: CreateAddressDto): Promise<{
        number: number;
        id: number;
        street: string;
        complement: string | null;
        neighborhood: string;
        city: string;
        state: string;
        zip_code: string;
        userId: number;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAddressDto: UpdateAddressDto): string;
    remove(id: number): string;
}
