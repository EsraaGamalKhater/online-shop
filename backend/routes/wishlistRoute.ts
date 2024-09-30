import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controller/auth';
import { addProductToWishlist, deleteProductFromWishlist, getUserWishlist } from '../controller/wishlist';
import { addToWishlistValidator, removeFromWishlistValidator } from '../utils/validator/wishlistValidator';

const wishlistRoute: Router = Router()
wishlistRoute.use(protectRoutes, checkActive, allowedTo('user'))
wishlistRoute.route('/')
  .get(getUserWishlist)
  .post(addToWishlistValidator, addProductToWishlist)

wishlistRoute.route('/:productId')
  .delete(removeFromWishlistValidator, deleteProductFromWishlist);

export default wishlistRoute;