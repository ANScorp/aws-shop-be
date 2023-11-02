import csv from 'csv-parser';
import { s3 } from '../aws.js';

export const parseFile = (params) => {
  return new Promise((resolve, reject) => {
    const s3Stream = s3.getObject(params).createReadStream();
    const results = [];

    s3Stream
      .pipe(csv())
      .on('data', (data) => {
        console.log('data: ', data);
        results.push(data);
      })
      .on('error', (error) => {
        console.log('error: ', error);
        reject(error)
      })
      .on('end', () => {
        console.log('end: ', results);
        resolve(results);
      })
  });
};
