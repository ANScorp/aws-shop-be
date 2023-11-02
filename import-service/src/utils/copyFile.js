import { s3 } from '../aws.js';

export const copyFile = async (filePath) => {
  await s3.copyObject({
    Bucket: process.env.BUCKET_NAME,
    CopySource: `${process.env.BUCKET_NAME}/${filePath}`,
    Key: filePath.replace('uploaded', 'parsed'),
  }).promise();

  await s3.deleteObject({
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
  }).promise();

  console.log(`${filePath.split('/')[1]} is copied!`);
};
