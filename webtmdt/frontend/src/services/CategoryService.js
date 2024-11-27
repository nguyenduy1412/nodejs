import axios from "axios";

const REST_API_BASE_URL="http://localhost:3000/api/categories";

export const ListCategories = async () => {
    try {
        const response = await axios.get(REST_API_BASE_URL);
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};