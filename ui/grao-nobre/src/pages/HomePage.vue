<template>
    <div>
        <div v-if="loading" class="text-center mt-6">Carregando produtos...</div>

        <div v-else class="flex flex-col justify-center">
            <div class="flex flex-col mx-[30px] my-[20px] gap-[10px]">
                <span>Filtre os produtos:</span>
                <div class="flex gap-[10px]">
                    <n-input v-model:value="searchQuery" placeholder="Buscar produto..." clearable round
                        class="input" />

                    <n-select v-model:value="selectedCategory" :options="categoryOptions"
                        placeholder="Filtrar por categoria" clearable round class="input" />
                </div>
            </div>

            <div class="grid grid-cols-3 gap-6 justify-items-center max-w-6xl w-full">
                <n-card v-for="product in filteredProducts" :key="product.id" class="card">
                    <template #cover>
                        <div class="image-container">
                            <img v-if="product.imageUrl" :src="product.imageUrl"
                                alt="Imagem do produto" class="product-image" />
                        </div>
                    </template>
                    <span class="flex justify-between items-center">
                        <h2 class="text-lg font-bold mt-2">{{ product.name }}</h2>
                        <n-button circle size="large" @click="addToCart(product)">
                            <template #icon>
                                <NIcon size="25" color="#6f4e37">
                                    <ShoppingCartOutlined />
                                </NIcon>
                            </template>
                        </n-button>
                    </span>
                    <p class="text-gray-600 mt-1">{{ product.description }}</p>
                    <p class="text-brown-700 font-semibold mt-2">R$ {{ product.price }}</p>
                </n-card>

                <div v-if="filteredProducts.length === 0" class="text-gray-500 mt-10">
                    Nenhum produto encontrado.
                </div>
            </div>
        </div>
        <n-button circle size="large" class="cart-float" @click="toggleCart">
            <template #icon>
                <NIcon size="25" color="#ffffff">
                    <ShoppingCartOutlined />
                </NIcon>
                <span class="badge" v-if="cart.totalQuantity">
                    {{ cart.totalQuantity }}
                </span>
            </template>
        </n-button>
        <transition name="fade">
            <div v-if="isCartOpen" class="cart-modal">
                <div class="cart-header">
                    <h3>Meu carrinho</h3>
                    <button @click="toggleCart" class="close-btn">x</button>
                </div>
                <div v-if="cart.items.length === 0" class="empty-cart">
                    Seu carrinho está vazio.
                </div>
                <div v-else class="cart-items">
                    <div v-for="item in cart.items" :key="item.id" class="cart-item">
                        <div>
                            <p class="font-semibold">{{ item.name }}</p>
                            <p>R$ {{ item.price }}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="number" min="1" v-model.number="item.quantity"
                                @change="cart.updateQuantity(item.id, item.quantity)" class="qty-input" />
                            <button @click="cart.removeItem(item.id)" class="remove-btn">
                                x
                            </button>
                        </div>
                    </div>
                    <div class="cart-footer">
                        <p><strong>Total:</strong> R$ {{ cart.totalPrice }}</p>
                        <n-button type="primary" @click="finalizePurchase" round>
                            Finalizar compra
                        </n-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { productService } from "@/services/productService";
import { NIcon } from "naive-ui";
import { ShoppingCartOutlined } from "@vicons/antd";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const products = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref("")
const selectedCategory = ref("")
const isCartOpen = ref(false);

const router = useRouter();
const cart = useCartStore();

onMounted(async () => {
    loading.value = true;
    try {
        products.value = await productService.getAll();
    } finally {
        loading.value = false;
    }
});

const categoryOptions = computed(() => {
    const uniqueCategories = Array.from(new Set(products.value.map(p => p.category)))
    return uniqueCategories.map(category => ({
        label: category,
        value: category
    }))
})

const filteredProducts = computed(() => {
    return products.value.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())

        const matchesCategory =
            !selectedCategory.value || product.category === selectedCategory.value

        return matchesSearch && matchesCategory
    })
})

const addToCart = (product: any) => {
    cart.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
    });
};

const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
};

const finalizePurchase = () => {
    isCartOpen.value = false;
    router.push("/cart");
};
</script>

<style scoped>
.card {
    width: 90%;
    margin-bottom: 10px;
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
    transition: all 0.3s ease;
    background-color: #fff8f0;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-radius: 0.5rem;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.input {
    max-width: 20%;
    background-color: #fff8f0;
    border: 1px solid #6f4e37;
    color: #6f4e37;
}

.cart-float {
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: #6f4e37;
    color: white;
    padding: 16px;
    border-radius: 50%;
    font-size: 22px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
}

.cart-float:hover {
    transform: scale(1.1);
    background-color: #8b5e3b;
}

.badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: red;
    border-radius: 50%;
    font-size: 12px;
    padding: 2px 6px;
}

.cart-modal {
    position: fixed;
    bottom: 90px;
    right: 25px;
    width: 320px;
    background-color: #fff8f0;
    border: 1px solid #6f4e37;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    padding: 16px;
    z-index: 9999;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.close-btn {
    background: none;
    border: none;
    color: #6f4e37;
    font-size: 18px;
    cursor: pointer;
}

.cart-items {
    max-height: 250px;
    overflow-y: auto;
    margin-bottom: 10px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.qty-input {
    width: 50px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 4px;
}

.remove-btn {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-weight: bold;
}

.cart-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>