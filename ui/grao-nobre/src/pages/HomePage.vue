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
                            <img v-if="product.imageUrl" :src="`http://localhost:3000${product.imageUrl}`"
                                alt="Imagem do produto" class="product-image" />
                        </div>
                    </template>
                    <span class="flex justify-between items-center">
                        <h2 class="text-lg font-bold mt-2">{{ product.name }}</h2>
                        <n-button circle size="large">
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
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { productService } from "@/services/productService";
import { NIcon } from "naive-ui";
import { ShoppingCartOutlined } from "@vicons/antd";

const products = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref("")
const selectedCategory = ref("")

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
</style>