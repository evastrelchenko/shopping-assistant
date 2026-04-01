import axios from 'axios';

const BASE_URL = 'https://shopping-assistant-production-faa4.up.railway.app/api';

export const getRecommendations = async (message) => {
    const response = await axios.post(`${BASE_URL}/recommend`, { message });
    return response.data.products;
};

export const getWishlist = async () => {
    const response = await axios.get(`${BASE_URL}/wishlist`);
    return response.data;
};

export const addToWishlist = async (product) => {
    const response = await axios.post(`${BASE_URL}/wishlist`, product);
    return response.data;
};

export const removeFromWishlist = async (id) => {
    await axios.delete(`${BASE_URL}/wishlist/${id}`);
};