import { v4 as uuidv4 } from 'uuid';
import { putItem } from '../utils/dynamoDb.js';
import { productValidator } from '../validators/productValidator.js';

export const createProduct = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const validatedProduct = productValidator(parsedBody);

  if (!validatedProduct.valid) {
    throw new Error('Product schema is not valid!');
  }

  const product = validatedProduct.body;
  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Item: {
      id: uuidv4(),
      ...product,
    },
  };

  try {
    await putItem(params);

    return {
      statusCode: 201,
      body: JSON.stringify(`Product ${product.title} successfully created!`),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
