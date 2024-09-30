import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validator";

export const addAddressValidator: RequestHandler[] = [
  check('address').notEmpty().withMessage('address required'),
  check('address.street').notEmpty().withMessage('Street is required'),
  check('address.city').notEmpty().withMessage('City is required'),
  check('address.state').notEmpty().withMessage('State is required'),
  check('address.postalCode')
    .notEmpty().withMessage('Postal Code is required')
    .isPostalCode('any').withMessage('Invalid Postal Code format'),

  validatorMiddleware
];

export const removeAddressValidator: RequestHandler[] = [
  check('addressId').isMongoId().withMessage('invalid address id'),
  validatorMiddleware
];