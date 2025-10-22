<template>
    <div class="flex h-screen">
        <!-- Lado esquerdo: login -->
        <div class="flex items-center justify-center w-1/2 bg-white">
            <n-card title="Acesse sua conta" class="w-96 shadow-lg rounded-xl">
                <n-form @submit.prevent="handleLogin">
                    <n-form-item label="Email">
                        <n-input v-model:value="email" placeholder="Digite seu email" type="email" required />
                    </n-form-item>

                    <n-form-item label="Senha">
                        <n-input v-model:value="password" placeholder="Digite sua senha" type="password" required />
                    </n-form-item>

                    <n-button type="primary" block :loading="loading" attr-type="submit">
                        Entrar
                    </n-button>

                    <n-alert v-if="error" type="error" class="mt-3">
                        {{ error }}
                    </n-alert>
                </n-form>
            </n-card>
        </div>

        <!-- Lado direito: imagem -->
        <div class="w-1/2 h-screen">
            <n-image :src="loginImage" alt="Imagem de login" class="object-cover w-full h-full" preview-disabled />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import loginImage from '@/assets/login-image.jpg'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
    try {
        loading.value = true
        error.value = ''
        await auth.login(email.value, password.value)
        router.push('/home')
    } catch (err: any) {
        error.value = 'Credenciais inválidas'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
@media (max-width: 768px) {
    .w-1\/2:nth-child(2) {
        display: none;
    }

    .w-1\/2 {
        width: 100%;
    }
}
</style>
