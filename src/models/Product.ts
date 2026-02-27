import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  sku?: string;
  weight?: number;
  variants?: { name: string; options: string[] }[];
  isActive: boolean;
  isFeatured: boolean;
  cbdContent?: string;
  lab_results_url?: string;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number },
    images: [{ type: String }],
    category: { type: String, required: true },
    tags: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String },
    weight: { type: Number },
    variants: [
      {
        name: String,
        options: [String],
      },
    ],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    cbdContent: { type: String },
    lab_results_url: { type: String },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema);
