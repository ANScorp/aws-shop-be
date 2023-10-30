import { scanTable } from '../utils/dynamoDb.js';

export const getProductsList = async (event) => {
  try {
    const products = await scanTable(process.env.PRODUCTS_TABLE, 'Products');
    const stock = await scanTable(process.env.StockTableName, 'Stock');

    const joinedProducts = products?.map((product) => {
      const productOnStock = stock?.find(
        (item) => item.product_id === product.id
      );

      if (!productOnStock) return product;

      return { ...product, count: productOnStock.count };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(joinedProducts),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
