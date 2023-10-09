import { fetchProducts } from '../fetchProducts.js';

const findProductById = async (productId) => {
  const products = await fetchProducts();
  const product = products.find(product => product.id === productId);

  if (!product) {
    throw new Error('Product not found!');
  }

  return product;
}

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;

  try {
    const foundProduct = await findProductById(productId);

    const product = {
      [productId]: foundProduct,
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error.message),
    }
  }
}