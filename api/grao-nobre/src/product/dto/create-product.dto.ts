import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsNumber,
    IsInt,
    IsPositive,
    IsUrl,
} from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Café Gourmet', description: 'Nome do produto' })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Café 100% arábica, torrado e moído',
        description: 'Descrição do produto',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 29.9, description: 'Preço do produto' })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({
        example: 'https://example.com/imagens/cafe.jpg',
        description: 'URL da imagem do produto',
        required: false,
    })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiProperty({ example: 'Bebidas', description: 'Categoria do produto' })
    @IsString()
    category: string;

    @ApiProperty({ example: 100, description: 'Quantidade em estoque' })
    @IsInt()
    @IsPositive()
    stock: number;
}
