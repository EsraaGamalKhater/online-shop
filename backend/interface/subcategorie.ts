import { Document } from "mongoose";
import { Categories } from "./categorie";

export interface Subcategories extends Document {
  name: string;
  image: string;
  category: Categories;
}
