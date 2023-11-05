export const generateAuthPolicy = (event, principalId, effect = 'Deny') => {
  const policy = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: event.routeArn,
        },
      ],
    },
  };

  return policy;
};
