import { Router } from "express";
import { createsubCategory,getAllSubCate,getsubCategory,updatesubCategory,deletesubCategory,filterSubcategories} from "../controller/subcategorie";
import { createSubcategoryValidator,updateSubcategoryValidator, deleteSubcategoryValidator ,getSubcategoryValidator } from '../utils/validator/subcategoriesValidator';
import { allowedTo, checkActive, protectRoutes } from '../controller/auth';

const subcategoriesRoute: Router = Router({mergeParams:true});

subcategoriesRoute.route('/')
    .post(protectRoutes, checkActive, allowedTo('manager', 'admin'),createSubcategoryValidator,createsubCategory)
    .get(filterSubcategories,getAllSubCate);
subcategoriesRoute.route('/:id')
    .get(getSubcategoryValidator,getsubCategory)
    .put(protectRoutes, checkActive, allowedTo('manager', 'admin'),updateSubcategoryValidator,updatesubCategory)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'),deleteSubcategoryValidator,deletesubCategory);

export default subcategoriesRoute;
