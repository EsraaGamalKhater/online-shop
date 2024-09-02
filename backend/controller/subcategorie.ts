import { NextFunction, Request, Response } from "express";
import subcategoriesModel from "../models/subcategorieModel";
import asyncHandler from 'express-async-handler';
import {Subcategories} from "../interface/subcategorie"

export const createsubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const subcategory = await subcategoriesModel.create(req.body);
  res.status(201).json({ data: subcategory });
});
export const updatesubCategory=asyncHandler( async (req:Request,res:Response,next:NextFunction)=>{
  const subcategory:Subcategories | null = await subcategoriesModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.status(200).json({data: subcategory})
}); 
export const getAllSubCate=asyncHandler( async (req:Request,res:Response,next:NextFunction)=>{
  const subcategory:Subcategories[] = await subcategoriesModel.find()
  res.status(200).json({data: subcategory})
});
export const getsubCategory=asyncHandler( async (req:Request,res:Response,next:NextFunction)=>{
  const subcategory: Subcategories | null = await subcategoriesModel.findById(req.params.id);
  res.status(200).json({data: subcategory})
});
export const deletesubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const subcategory: Subcategories | null = await subcategoriesModel.findByIdAndDelete(req.params.id);
  res.status(204).json()
});