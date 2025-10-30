import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [] as {
            id: number;
            name: string;
            price: number;
            quantity: number;
        }[],
    }),

    getters: {
        totalQuantity: (state) =>
            state.items.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: (state) =>
            state.items.reduce(
                (acc, item) => acc + Number(item.price) * Number(item.quantity),
                0
            ),
    },

    actions: {
        addItem(product: { id: number; name: string; price: number }) {
            const existing = this.items.find((i) => i.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
        },

        updateQuantity(id: number, quantity: number) {
            const item = this.items.find((i) => i.id === id);
            if (item) item.quantity = Math.max(1, quantity);
        },

        removeItem(id: number) {
            this.items = this.items.filter((i) => i.id !== id);
        },

        clearCart() {
            this.items = [];
        },
    },
});
