import fs from 'fs';
import { docClient } from './awsDocClient.js';

console.log('Importing products into DynamoDB. Please wait...');

let products = JSON.parse(fs.readFileSync('mockProductsData.json', 'utf8'));

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

  docClient.put(params, (err, data) => {
    if (err) {
           console.error('Unable to add product', product.title, '. Error:', JSON.stringify(err, null, 2));
       } else {
           console.log('PutItem succeeded:', product.title);
       }
    });
});
