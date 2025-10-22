<template>
    <div class="flex h-screen overflow-hidden">
        <div class="flex flex-col w-1/2 bg-white relative">
            <img src="@/assets/logo-com-nome.png" alt="Logo" class="absolute top-6 left-6 max-w-[200px]" />
            <div class="flex flex-1 items-center justify-center">
                <div class="w-96 card">
                    <n-tabs v-model:value="activeTab" class="card-tabs" default-value="login" size="large" animated
                        pane-wrapper-style="margin: 0 -4px"
                        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">

                        <n-tab-pane name="login" tab="Login">
                            <n-form @submit.prevent="handleLogin">
                                <n-form-item label="Email">
                                    <n-input v-model:value="email" placeholder="Digite seu email" type="email"
                                        required />
                                </n-form-item>

                                <n-form-item label="Senha">
                                    <n-input v-model:value="password" placeholder="Digite sua senha" type="password"
                                        required />
                                </n-form-item>

                                <n-button type="primary" block :loading="loading" attr-type="submit"
                                    style="background-color: #6f4e37;">
                                    Entrar
                                </n-button>

                                <n-alert v-if="error" type="error" class="mt-3">
                                    {{ error }}
                                </n-alert>
                            </n-form>
                        </n-tab-pane>

                        <n-tab-pane name="singUp" tab="Cadastre-se">
                            <n-form @submit.prevent="handleSignup">
                                <n-form-item label="Nome">
                                    <n-input v-model:value="signupName" placeholder="Digite seu nome" type="text"
                                        required />
                                </n-form-item>

                                <n-form-item label="Celular">
                                    <n-input v-model:value="signupCellPhoneNumber" placeholder="Digite seu celular"
                                        type="text" required />
                                </n-form-item>

                                <n-form-item label="Email">
                                    <n-input v-model:value="signupEmail" placeholder="Digite seu email" type="email"
                                        required />
                                </n-form-item>

                                <n-form-item label="Senha">
                                    <n-input v-model:value="signupPassword" placeholder="Digite sua senha"
                                        type="password" required />
                                </n-form-item>

                                <n-form-item label="Repita a senha">
                                    <n-input v-model:value="signupPasswordConfirm" placeholder="Repita sua senha"
                                        type="password" required />
                                </n-form-item>

                                <n-form-item>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="agreeTerms" class="mr-2" />
                                        I agree with <a href="#" class="text-blue-600 underline">Terms & Conditions</a>
                                    </label>
                                </n-form-item>

                                <n-button type="primary" block :loading="loading" attr-type="submit"
                                    style="background-color: #6f4e37;" :disabled="!agreeTerms">
                                    Sign Up
                                </n-button>

                                <n-alert v-if="signupError" type="error" class="mt-3">
                                    {{ signupError }}
                                </n-alert>
                            </n-form>
                        </n-tab-pane>
                    </n-tabs>
                </div>
            </div>
        </div>
        <div class="w-1/2 h-screen">
            <img :src="loginImage" alt="Imagem de login" class="w-full h-full object-cover" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import loginImage from '@/assets/login-image.jpg'
import { useNotification } from 'naive-ui'

const activeTab = ref('login')
const notification = useNotification()

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

const signupName = ref('')
const signupCellPhoneNumber = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const signupPasswordConfirm = ref('')
const signupError = ref('')
const agreeTerms = ref(false)

const handleSignup = async () => {
    try {
        loading.value = true
        signupError.value = ''

        if (signupPassword.value !== signupPasswordConfirm.value) {
            signupError.value = 'As senhas não coincidem'
            return
        }

        await auth.signUp(signupName.value, signupEmail.value, signupPassword.value, signupCellPhoneNumber.value)
    } catch (err: any) {
        signupError.value = 'Erro ao registrar usuário'
    } finally {
        loading.value = false
        notification.success({
            title: 'Sucesso',
            content: 'Usuário registrado com sucesso! Por favor, faça login.',
            duration: 3000
        })
        clearFields()
        activeTab.value= 'login'
    }
}

const clearFields = () => {
    email.value = ''
    password.value = ''
    signupName.value = ''
    signupCellPhoneNumber.value = ''
    signupEmail.value = ''
    signupPassword.value = ''
    signupPasswordConfirm.value = ''
    agreeTerms.value = false
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

.card {
    width: 80%;
}
</style>
