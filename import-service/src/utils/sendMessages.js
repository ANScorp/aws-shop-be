import { sqs } from '../aws.js';

export const sendMessages = async (chunks) => {
  chunks.forEach(async (chunk) => {
    await sqs
      .sendMessage(
        {
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(chunk),
        },
        () => {
          console.log('Sent message for chunk: ', chunk);
        }
      )
      .promise();
  });
};
