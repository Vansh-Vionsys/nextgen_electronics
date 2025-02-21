// get all products

import axios from "axios";

export const getAllProductsApi = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};
