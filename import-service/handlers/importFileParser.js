import { parseFile } from '../parseFile.js';
import { copyFile } from '../copyFile.js';

export const importFileParser = async (event) => {
  const filePath = event.Records[0].s3.object.key;

  const params = {
    Bucket: process.env.BucketName,
    Key: filePath,
  };

  try {
    await parseFile(params);
    await copyFile(filePath);

    return {
      statusCode: 200,
    }
  } catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    }
  }
}
