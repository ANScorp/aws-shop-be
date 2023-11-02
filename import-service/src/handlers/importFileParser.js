import { parseFile } from '../utils/parseFile.js';
import { copyFile } from '../utils/copyFile.js';
import { sendMessages } from '../utils/sendMessages.js';

export const importFileParser = async (event, context, callback) => {
  const filePath = event.Records[0].s3.object.key;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
  };

  try {
    const parsedFile = await parseFile(params);
    await copyFile(filePath);
    await sendMessages(parsedFile);

    callback(null, {
      statusCode: 200,
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
