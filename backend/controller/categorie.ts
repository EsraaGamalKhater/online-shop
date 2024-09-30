import { NextFunction ,Request,Response} from "express";
import categoriesModel from "../models/categorieModel";
import asyncHandler from 'express-async-handler';
import {Categories} from "../interface/categorie";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandlind";


export const createCategory = createOne<Categories>(categoriesModel);
export const updateCategory=updateOne<Categories>(categoriesModel) 
export const getAllCategories=getAll<Categories>(categoriesModel, 'categories');
export const getCategory=getOne<Categories>(categoriesModel);
export const deleteCategory = deleteOne<Categories>(categoriesModel)




