import { CreateAddressDto } from '../../address/dto/create-address.dto';
declare class OrderItemDto {
    id: number;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    userId: number;
    addressId?: number;
    address: CreateAddressDto;
    total: number;
    paymentType: string;
    items: OrderItemDto[];
}
export {};
