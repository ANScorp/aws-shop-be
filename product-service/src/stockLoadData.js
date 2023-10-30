import fs from 'fs';
import { putItem } from './utils/dynamoDb.js';

console.log('Importing stock into DynamoDB. Please wait...');

let stocks = JSON.parse(fs.readFileSync('mocks/mockStockData.json', 'utf8'));

stocks.forEach((item) => {
  const params = {
    TableName: process.env.StockTableName,
    Item: {
      'product_id':  item.product_id,
      'count': item.count
    }
  };

  putItem(params)
    .then(() => console.log('PutItem succeeded: ', item.product_id))
    .catch((err) => {
      console.error('Unable to add product to stock', item, '. Error:', JSON.stringify(err, null, 2));
    });
});
