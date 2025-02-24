import axios from "axios";

// get all products
export const getAllProductsApi = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

//get product by id (product details page [id])
export const getProductByIdAPI = async (id: string) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};
