import axios from 'axios'

const api = axios.create({
    baseURL: 'https://grao-nobre-api.onrender.com',
})

export default api