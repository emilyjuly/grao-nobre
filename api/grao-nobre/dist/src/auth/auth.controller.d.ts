import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
    login(loginAuthDto: LoginAuthDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
}
