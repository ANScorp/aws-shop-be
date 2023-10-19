import { docClient } from '../awsDocClient.js';

const query = async (id) => {
  console.log('query id: ', id);

  const queryResults = await docClient.query({
    TableName: process.env.ProductsTableName,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
  }).promise();

    if (!queryResults.Items ||  queryResults.Items?.length === 0) {
    throw new Error('Product not found!');
  }

  return queryResults.Items;
}

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;

  try {
    const product = await query(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    }
  }
}
