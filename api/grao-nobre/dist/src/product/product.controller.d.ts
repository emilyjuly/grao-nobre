import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    uploadFile(file: Express.Multer.File): {
        imageUrl: string;
    };
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
    findOne(id: string): Promise<{
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
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
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
    remove(id: string): Promise<{
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
