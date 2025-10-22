import api from "@/api/api";

export const productService = {
    async getAll() {
        const response = await api.get("/product");
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/product/${id}`);
        return response.data;
    },
};
