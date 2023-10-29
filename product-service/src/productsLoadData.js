import fs from 'fs';
import { putItem } from './utils/dynamoDb.js';

console.log('Importing products into DynamoDB. Please wait...');

let products = JSON.parse(fs.readFileSync('mocks/mockProductsData.json', 'utf8'));

products.forEach((product) => {
  const params = {
    TableName: process.env.ProductsTableName,
    Item: {
      'id':  product.id,
      'title': product.title,
      'description':  product.description,
      'price': product.price,
    }
  };

  putItem(params)
    .then(() => console.log('PutItem succeeded: ', product.title))
    .catch((err) => {
      console.error('Unable to add product', product.title, '. Error:', JSON.stringify(err, null, 2));
    });
});
