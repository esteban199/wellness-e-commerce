import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface IOrder extends Document {
  user?: mongoose.Types.ObjectId;
  guestEmail?: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: 'stripe' | 'payfirmly' | 'etransfer' | 'sinpe';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  stripePaymentIntentId?: string;
  affiliateCode?: string;
  notes?: string;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    guestEmail: { type: String },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String },
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'payfirmly', 'etransfer', 'sinpe'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    stripePaymentIntentId: { type: String },
    affiliateCode: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>('Order', OrderSchema);
