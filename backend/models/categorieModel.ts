import { Schema, model } from 'mongoose';
import { Categories } from '../interface/categorie';

const categoriesSchema: Schema = new Schema<Categories>({
  name: { type: String, required: true, trim: true, unique: true },
  image: String,
}, { timestamps: true });

export default model<Categories>('categories', categoriesSchema)