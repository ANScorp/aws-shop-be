import { generateAuthPolicy } from '../utils/generateAuthPolicy.js';

export const basicAuthorizer = async (event, context, callback) => {
  const authorizationHeader = event.headers.authorization;

  if (!authorizationHeader) return callback('Unauthorized');

  try {
    const encodedCreds = authorizationHeader.split(' ')[1];
    const plainCreds = Buffer.from(encodedCreds, 'base64').toString().split(':');
    const username = plainCreds[0];
    const password = plainCreds[1];

    const isAuthorized =
      username === process.env.USERNAME && password === process.env.PASSWORD;
    const effect = isAuthorized ? 'Allow' : 'Deny';
    const authResponse = generateAuthPolicy(event, username, effect);

    callback(null, authResponse);
  } catch (err) {
    callback(`Unauthorized: ${err.message}`);
  }
};
