import { Router } from "express";
import { createsubCategory,getAllSubCate,getsubCategory,updatesubCategory,deletesubCategory} from "../controller/subcategorie";

const subcategoriesRoute: Router = Router();

subcategoriesRoute.route('/')
    .post(createsubCategory)
    .get(getAllSubCate);
subcategoriesRoute.route('/:id')
    .get(getsubCategory)
    .put(updatesubCategory)
    .delete(deletesubCategory);

export default subcategoriesRoute;
