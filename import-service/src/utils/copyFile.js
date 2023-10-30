import { s3 } from '../aws.js';

export const copyFile = async (filePath) => {
  await s3.copyObject({
    Bucket: process.env.BucketName,
    CopySource: `${process.env.BucketName}/${filePath}`,
    Key: filePath.replace('uploaded', 'parsed'),
  }).promise();

  await s3.deleteObject({
    Bucket: process.env.BucketName,
    Key: filePath,
  }).promise();

  console.log(`${filePath.split('/')[1]} is copied!`);
};
