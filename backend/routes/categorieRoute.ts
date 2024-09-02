import { Router } from "express";
import { createCategory, updateCategory, getAllCategories, getCategory, deleteCategory } from "../controller/categorie"
const categoriesRoute: Router = Router();
categoriesRoute.route('/')
    .post(createCategory)
    .get(getAllCategories);
categoriesRoute.route('/:id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);
export default categoriesRoute;
