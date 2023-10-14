import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.REGION,
});

const docClient = new AWS.DynamoDB.DocumentClient();

export { docClient };
