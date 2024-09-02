import { Schema, model } from 'mongoose';
import { Subcategories } from '../interface/subcategorie';

const subcategoriesSchema: Schema<Subcategories> = new Schema({
  name: { type: String, required: true, trim: true },
  image: String,
  category: { type: Schema.Types.ObjectId, ref: 'categories' }
}, { timestamps: true });

export default model<Subcategories>('Subcategories', subcategoriesSchema);
