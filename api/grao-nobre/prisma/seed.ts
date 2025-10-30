import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seed do banco...')

    // --- Usuário ---
    const user = await prisma.user.create({
        data: {
            name: 'Emily July',
            email: 'emily@example.com',
            password: '123456',
            cell_phone_number: '11999999999',
            addresses: {
                create: [
                    {
                        street: 'Rua das Flores',
                        number: 123,
                        complement: 'Apto 45',
                        neighborhood: 'Centro',
                        city: 'São Paulo',
                        state: 'SP',
                        zip_code: '01010-000'
                    }
                ]
            }
        },
        include: { addresses: true }
    })

    console.log(`✅ Usuário criado: ${user.name}`)

    // --- Produtos ---
    const products = await prisma.product.createMany({
        data: [
            {
                name: 'Café Gourmet Clássico 250g',
                description: 'Blend equilibrado de grãos selecionados.',
                price: 29.90,
                category: 'Café',
                stock: 50
            },
            {
                name: 'Cápsulas Espresso Intenso (10 un)',
                description: 'Sabor encorpado e aroma marcante.',
                price: 34.90,
                category: 'Cápsulas',
                stock: 100
            },
            {
                name: 'Caneca Personalizada Cafeteria Gourmet',
                description: 'Caneca de porcelana 300ml.',
                price: 39.90,
                category: 'Acessórios',
                stock: 25
            }
        ]
    })

    console.log(`✅ ${products.count} produtos inseridos`)

    // --- Pedido (Order) ---
    const firstProduct = await prisma.product.findFirst()

    if (firstProduct && user.addresses.length > 0) {
        const order = await prisma.order.create({
            data: {
                total: firstProduct.price,
                status: 'Pendente',
                userId: user.id,
                addressId: user.addresses[0].id,
                items: {
                    create: [
                        {
                            productId: firstProduct.id,
                            quantity: 1,
                            price: firstProduct.price
                        }
                    ]
                },
                payment: {
                    create: {
                        type: 'Cartão de Crédito',
                        status: 'Aguardando Pagamento'
                    }
                }
            },
            include: { items: true, payment: true }
        })

        console.log(`✅ Pedido criado com ID: ${order.id}`)
    }

    console.log('🌱 Seed finalizado com sucesso!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
