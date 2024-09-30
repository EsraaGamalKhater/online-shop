import { Router } from "express";
import { createCategory, updateCategory, getAllCategories, getCategory, deleteCategory } from "../controller/categorie";
import subcategoriesRoute from "./subcategorieRoute";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validator/categoriesValidator';
import { protectRoutes , allowedTo, checkActive} from '../controller/auth';

const categoriesRoute: Router = Router();
categoriesRoute.use('/:categoryId/subcategories',subcategoriesRoute)
categoriesRoute.route('/')
    .post(protectRoutes, checkActive,allowedTo('manager','admin'),createCategoryValidator,createCategory)
    .get(getAllCategories);
categoriesRoute.route('/:id')
    .get(getCategoryValidator,getCategory)
    .put(protectRoutes, checkActive,allowedTo('manager','admin'),updateCategoryValidator,updateCategory)
    .delete(protectRoutes, checkActive,allowedTo('manager','admin'),deleteCategoryValidator,deleteCategory);
export default categoriesRoute;
