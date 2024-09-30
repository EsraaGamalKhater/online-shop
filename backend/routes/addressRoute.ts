import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controller/auth';
import { addAddress, deleteAddress, getUserAddress } from '../controller/address';
import { addAddressValidator, removeAddressValidator } from '../utils/validator/addressValidator';

const addressRoute: Router = Router()
addressRoute.use(protectRoutes, checkActive, allowedTo('user'))
addressRoute.route('/')
  .get(getUserAddress)
  .post(addAddressValidator, addAddress)

addressRoute.route('/:addressId')
  .delete(removeAddressValidator, deleteAddress);

export default addressRoute;