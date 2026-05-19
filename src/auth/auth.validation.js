import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(120).required(),
  email: Joi.string().trim().lowercase().email().max(180).required(),
  phone: Joi.string().trim().pattern(/^[0-9+\-\s()]{7,30}$/).required(),
  password: Joi.string().min(8).max(72).required(),
  confirm_password: Joi.valid(Joi.ref('password')).required().messages({
    'any.only': 'confirm_password must match password'
  })
});

export const loginSchema = Joi.object({
  identifier: Joi.string().trim(),
  email: Joi.string().trim().lowercase().email().max(180),
  phone: Joi.string().trim().pattern(/^[0-9+\-\s()]{7,30}$/),
  password: Joi.string().required()
})
  .or('identifier', 'email', 'phone')
  .custom((value, helpers) => {
    return {
      identifier: value.identifier || value.email || value.phone,
      password: value.password
    };
  })
  .messages({
    'object.missing': 'email or phone is required'
  });

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    req.body = value;
    return next();
  };
};
