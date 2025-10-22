import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
