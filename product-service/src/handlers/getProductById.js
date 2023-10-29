import { queryItem } from '../utils/dynamoDb.js';

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;

  try {
    const product = await queryItem(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error.message),
    };
  }
};
