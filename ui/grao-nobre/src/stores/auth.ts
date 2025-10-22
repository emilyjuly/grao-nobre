import { defineStore } from 'pinia'
import axios from 'axios'
import api from '@/api/api'

interface AuthState {
    token: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token'),
    }),

    actions: {
        async login(email: string, password: string) {
            const res = await axios.post(`${api}auth/login`, {
                email,
                password,
            })
            this.token = res.data.access_token
            if (this.token) localStorage.setItem('token', this.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        },

        async signUp(name: string, email: string, password: string, cell_phone_number: string) {
            const res = await axios.post(`${api}auth/register`, {
                name,
                email,
                password,
                cell_phone_number,
            })
            this.token = res.data.access_token
            if (this.token) localStorage.setItem('token', this.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        },

        logout() {
            this.token = null
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        },
    },
})
