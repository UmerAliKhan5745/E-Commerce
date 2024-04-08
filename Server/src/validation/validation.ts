import { Request, Response, NextFunction } from 'express';
import Joi from 'joi'
export const validationSchema = Joi.object({
    name: Joi.string().min(3).messages({
        'string.min': 'Name must be at least 3 characters long',
        'any.required': 'Name is required',
      }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'email is required',
  }),
  password: Joi.string().min(3).messages({
    'string.min': 'Password must be at least 3 characters long',
    'any.required': 'Password is required',
  }),
   dateOfBirth: Joi.string().messages({
    'string.min': 'DateOfBirth must be at least',
    'any.required': 'dateOfBirth is required',
  }),
   OTP: Joi.string().messages({
    'string.min': 'OTP must be Empty',
    'any.required': 'OTP is required',
  })
});

const validate = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error:any) {
      res.status(400).json({ errors: error.details.map((err: any) => err.message) });
    }
  };
};

export const validationsMiddleware = validate(validationSchema);
