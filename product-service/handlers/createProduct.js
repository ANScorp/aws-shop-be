import { v4 as uuidv4 } from 'uuid';
import { docClient } from '../awsDocClient.js';

const putItem = async (params) => {
  console.log('putItem params: ', params);
  await docClient.put(params).promise();
};

export const createProduct = async (event) => {
  const params = {
    TableName: process.env.ProductsTableName,
    Item: {
      'id': uuidv4(),
      'title': 'newItem'
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
      statusCode: 400,
      body: JSON.stringify('Invalid params. Product not created!'),
    }
  }
}
