import Joi from 'joi';

const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
});

const productSchemaValidator = (schema, body) => {
  const { error } = schema.validate(body);

  if (error?.isJoi) {
    return {
      valid: false,
      body: null,
      errorMessage: error.message,
    };
  }

  return {
    valid: true,
    body,
    errorMessage: null,
  };
};

const productValidator = (body) => productSchemaValidator(productSchema, body);

export { productValidator };
