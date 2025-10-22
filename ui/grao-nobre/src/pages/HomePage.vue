<template>
    <div>
        <h1>Bem-vinda, Emily 🎉</h1>
        <button @click="logout">Sair</button>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
    auth.logout()
    router.push('/')
}
</script>
