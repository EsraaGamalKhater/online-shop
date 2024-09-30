import subcategoriesModel from "../models/subcategorieModel";
import { Subcategories } from "../interface/subcategorie";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandlind";
import {FilterData} from "../interface/filterData";
import { NextFunction ,Request,Response} from "express";

export const filterSubcategories = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) {
        filterData.category = req.params.categoryId;
        req.filterData = filterData;
    }
    
    next();
}
export const createsubCategory = createOne<Subcategories>(subcategoriesModel);
export const updatesubCategory = updateOne<Subcategories>(subcategoriesModel);
export const getAllSubCate = getAll<Subcategories>(subcategoriesModel, 'subcategories');
export const getsubCategory = getOne<Subcategories>(subcategoriesModel);
export const deletesubCategory = deleteOne<Subcategories>(subcategoriesModel);
