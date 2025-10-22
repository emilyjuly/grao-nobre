import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: {
        name: string;
        email: string;
        password: string;
        cell_phone_number: string;
    }): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
    validateUser(email: string, password: string): Promise<{
        name: string;
        email: string;
        password: string;
        cell_phone_number: string;
        id: number;
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
}
