import { fetchProducts } from '../fetchProducts.js';

const getProducts = async () => {
  const products = await fetchProducts();

  if (!products) {
    throw new Error('Products not found!');
  }

  return products;
}

export const getProductsList = async (event) => {
  try {
    const products = await getProducts();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch(error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error.message),
    }
  }
}
