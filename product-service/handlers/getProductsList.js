import { docClient } from '../awsDocClient.js';

const scanProductsTable = async () => {
  const scanResults = await docClient.scan({
    TableName: process.env.ProductsTableName,
  }).promise();

  if (!scanResults.Items ||  scanResults.Items?.length === 0) {
    throw new Error('Products not found!');
  }
  
  return scanResults.Items;
}

const scanStockTable = async () => {
  const scanResults = await docClient.scan({
    TableName: process.env.StockTableName,
  }).promise();

    if (!scanResults.Items || scanResults.Items?.length === 0) {
    throw new Error('Stock not found!');
  }
  
  return scanResults.Items;
}

export const getProductsList = async (event) => {
  try {
    const products = await scanProductsTable();
    const stock = await scanStockTable();

    const joinedProducts = products.map(product => {
      const productOnStock = stock.find((item) => item.product_id === product.id);

      if (!productOnStock) return product;

      return { ...product, count: productOnStock.count };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(joinedProducts),
    }
  } catch(error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error.message),
    }
  }
}
