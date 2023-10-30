import AWS from 'aws-sdk';

const s3 = new AWS.S3({ region: process.env.REGION });
const sqs = new AWS.SQS({ region: process.env.REGION });

export { s3, sqs };
