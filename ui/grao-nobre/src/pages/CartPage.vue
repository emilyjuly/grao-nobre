<template>
    <div class="checkout-container">
        <h2 class="title">Finalizar Compra</h2>

        <div v-if="cart.items.length === 0" class="empty-cart">
            Seu carrinho está vazio.
        </div>

        <div v-else>
            <n-card v-for="item in cart.items" :key="item.id" class="mb-3">
                <div class="flex justify-between items-center">
                    <div>
                        <strong>{{ item.name }}</strong>
                        <p>Qtd: {{ item.quantity }}</p>
                    </div>
                    <p>R$ {{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
            </n-card>

            <div class="summary">
                <p><strong>Total:</strong> R$ {{ cart.totalPrice.toFixed(2) }}</p>
            </div>

            <n-form class="mt-4" :model="checkoutData">
                <n-form-item label="Endereço de entrega">
                    <n-input v-model:value="checkoutData.address.street" placeholder="Rua..." />
                </n-form-item>

                <n-form-item label="Número">
                    <n-input type="number" v-model:value="checkoutData.address.number" placeholder="Número..." />
                </n-form-item>

                <n-form-item label="Complemento">
                    <n-input v-model:value="checkoutData.address.complement" placeholder="Complemento..." />
                </n-form-item>

                <n-form-item label="Bairro">
                    <n-input v-model:value="checkoutData.address.neighborhood" placeholder="Bairro..." />
                </n-form-item>

                <n-form-item label="Cidade">
                    <n-input v-model:value="checkoutData.address.city" placeholder="Cidade..." />
                </n-form-item>

                <n-form-item label="Estado">
                    <n-input v-model:value="checkoutData.address.state" placeholder="Estado..." />
                </n-form-item>

                <n-form-item label="CEP">
                    <n-input v-model:value="checkoutData.address.zip_code" placeholder="CEP..." />
                </n-form-item>

                <n-form-item label="Forma de entrega">
                    <n-select v-model:value="checkoutData.deliveryMethod" :options="deliveryOptions"
                        placeholder="Selecione uma forma de entrega" />
                </n-form-item>

                <n-form-item label="Método de pagamento">
                    <n-select v-model:value="checkoutData.paymentType" :options="paymentOptions"
                        placeholder="Selecione um método de pagamento" />
                </n-form-item>

                <div class="flex justify-end mt-6">
                    <n-button type="primary" :loading="loading" @click="simulateCheckout" round>
                        Confirmar Pedido
                    </n-button>
                </div>
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useNotification } from 'naive-ui'
import api from '@/api/api'
import { useAuthStore } from '@/stores/auth'

const cart = useCartStore()
const auth = useAuthStore()
const notification = useNotification()

const checkoutData = ref({
    address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zip_code: ''
    },
    deliveryMethod: null,
    paymentType: null
})

const deliveryOptions = [
    { label: 'Entrega padrão (3 dias úteis)', value: 'Entrega padrão' },
    { label: 'Retirada no local', value: 'Retirada no local' }
]

const paymentOptions = [
    { label: 'Cartão de crédito', value: 'Cartão' },
    { label: 'Pix', value: 'Pix' },
    { label: 'Boleto bancário', value: 'Boleto' }
]

const loading = ref(false)
const successData = ref<any>(null)

const simulateCheckout = async () => {
    if (!checkoutData.value.address || !checkoutData.value.deliveryMethod || !checkoutData.value.paymentType) {
        notification.error({
            title: 'Atenção!',
            content: `Por favor, preencha todos os campos obrigatórios.`,
            duration: 3000
        })
        return
    }

    loading.value = true
    const userId = auth.idUser || 0
    try {
        const response = await api.post('/order', {
            userId: +userId,
            address: {
                street: checkoutData.value.address.street,
                number: +checkoutData.value.address.number,
                complement: checkoutData.value.address.complement,
                neighborhood: checkoutData.value.address.neighborhood,
                city: checkoutData.value.address.city,
                state: checkoutData.value.address.state,
                zip_code: checkoutData.value.address.zip_code,
            },
            total: cart.totalPrice,
            paymentType: checkoutData.value.paymentType,
            items: cart.items,
        })

        successData.value = response.data
        notification.success({
            title: 'Seu pedido foi realizado com sucesso.',
            content: `Id do pedido: ${successData.value?.orderId}, Entrega: ${successData.value?.estimatedDelivery}`,
            duration: 3000
        })
        cart.clearCart()
    } catch (error) {
        notification.error({
            title: 'Erro ao processar o pedido!',
            content: `Por favor, tente novamente mais tarde.`,
            duration: 3000
        })
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.checkout-container {
    max-width: 800px;
    margin: 0 auto;
    background: #fff8f0;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #6f4e37;
}

.title {
    text-align: center;
    color: #6f4e37;
    margin-bottom: 20px;
}

.summary {
    text-align: right;
    font-size: 18px;
    margin-top: 10px;
}
</style>
