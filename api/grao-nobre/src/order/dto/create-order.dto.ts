import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

class OrderItemDto {
    @IsNumber()
    id: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}

export class CreateOrderDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    @IsOptional()
    addressId?: number;

    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @IsNumber()
    total: number;

    @IsString()
    paymentType: string;

    @IsArray()
    items: OrderItemDto[];
}
