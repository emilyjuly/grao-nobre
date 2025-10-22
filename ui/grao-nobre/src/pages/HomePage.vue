<template>
    <div>
        <div v-if="loading">Carregando produtos...</div>
        <div v-else class="grid grid-cols-3 gap-6">
            <div v-for="product in products" :key="product.id"
                class="border rounded-lg p-4 shadow hover:shadow-md transition">
                <img v-if="product.imageUrl" :src="`http://localhost:3000${product.imageUrl}`" alt="Imagem do produto"
                    class="w-full h-48 object-cover rounded" />
                <h2 class="text-lg font-bold mt-2">{{ product.name }}</h2>
                <p class="text-gray-600 mt-1">{{ product.description }}</p>
                <p class="text-brown-700 font-semibold mt-2">R$ {{ product.price }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { productService } from "@/services/productService";

const products = ref<any[]>([]);
const loading = ref(false);

onMounted(async () => {
    loading.value = true;
    try {
        products.value = await productService.getAll();
    } finally {
        loading.value = false;
    }
});
</script>
