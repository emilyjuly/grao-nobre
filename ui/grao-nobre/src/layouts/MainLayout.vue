<template>
    <div class="main-layout">
        <header class="header">
            <img src="@/assets/logo-com-nome.png" alt="Logo" class="max-w-[200px]" />

            <nav class="nav-center">
                <router-link to="/home" class="nav-link">Catálogo</router-link>
                <router-link to="/cart" class="nav-link">Carrinho</router-link>
            </nav>

            <n-button @click="logout" quaternary class="flex items-center gap-1">
                <span style="color: #6f4e37; font-size: 16px;">Sair</span>
                <NIcon :component="LogoutOutlined" size="20" color="#6f4e37" />
            </n-button>
        </header>
        <main class="p-4">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { NIcon } from 'naive-ui'
import { LogoutOutlined } from '@vicons/antd'

const auth = useAuthStore()
const router = useRouter()

function logout() {
    auth.logout()
    router.push('/')
}
</script>

<style scoped>
.btn-logout:hover {
    opacity: 0.9;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.nav-center {
    display: flex;
    gap: 2rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.nav-link {
    color: #6f4e37;
    font-weight: 500;
    text-decoration: none;
}

.nav-link.router-link-exact-active {
    border-bottom: 2px solid #6f4e37;
}

.nav-link:hover {
    text-decoration: underline;
}
</style>
