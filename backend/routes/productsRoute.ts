import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProduct ,updateProduct, resizeProductImages, uploadProductImages} from '../controller/products';
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from '../utils/validator/productsValidator';
import { allowedTo, checkActive, protectRoutes } from '../controller/auth';
import reviewsRoute from './reviewsRoute';

const productsRoute: Router = Router();
productsRoute.use('/:productId/reviews', reviewsRoute);

productsRoute.route('/')
  .get(getAllProducts)
  .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), uploadProductImages,resizeProductImages,createProductValidator,createProduct);

productsRoute.route('/:id')
  .get(getProductValidator, getProduct)
  .put(protectRoutes, checkActive, allowedTo('manager', 'admin'),updateProductValidator, updateProduct)
  .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'),deleteProductValidator, deleteProduct);

export default productsRoute;