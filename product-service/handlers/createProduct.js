import { v4 as uuidv4 } from 'uuid';
import { docClient } from '../awsDocClient.js';

const putItem = async (params) => {
  console.log('putItem params: ', params);
  await docClient.put(params).promise();
};

export const createProduct = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const { title, description, price } = parsedBody;

  if (!title || !description || !price) {
    return {
      statusCode: 400,
      body: JSON.stringify('Invalid params. Product not created!'),
    }
  }

  const params = {
    TableName: process.env.ProductsTableName,
    Item: {
      id: uuidv4(),
      ...parsedBody,
    },
  };

  try {
    await putItem(params);

    return {
      statusCode: 201,
      body: JSON.stringify('Product successfully created!'),
    };
  } catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    }
  }
}
