import { s3 } from '../aws.js';

export const importProductsFile = async (event) => {
  console.log('importProductsFile event:');
  console.log(event);
  const { name } = event.queryStringParameters;

  if (!name) {
    return {
      statusCode: 404,
      body: JSON.stringify('Parameter name is missed!')
    }
  }

  const filePath = `uploaded/${name}`;
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
    ContentType: 'text/csv'
  }

  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);

    return {
      statusCode: 200,
      body: JSON.stringify(signedUrl),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    }
  }
};
