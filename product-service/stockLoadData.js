import fs from 'fs';
import { docClient } from './awsDocClient.js';

console.log('Importing stock into DynamoDB. Please wait...');

let stocks = JSON.parse(fs.readFileSync('mockStockData.json', 'utf8'));

stocks.forEach((item) => {
  const params = {
    TableName: process.env.StockTableName,
    Item: {
      'product_id':  item.product_id,
      'count': item.count
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
           console.error('Unable to add product to stock', item, '. Error:', JSON.stringify(err, null, 2));
       } else {
           console.log('PutItem succeeded:', item.product_id);
       }
    });
});
