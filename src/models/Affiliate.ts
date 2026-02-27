import mongoose, { Schema, Document } from 'mongoose';

export interface IAffiliate extends Document {
  user: mongoose.Types.ObjectId;
  code: string;
  commissionRate: number;
  totalSales: number;
  totalCommission: number;
  paidCommission: number;
  isActive: boolean;
  createdAt: Date;
}

const AffiliateSchema = new Schema<IAffiliate>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    commissionRate: { type: Number, required: true, default: 10 },
    totalSales: { type: Number, default: 0 },
    totalCommission: { type: Number, default: 0 },
    paidCommission: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Affiliate ||
  mongoose.model<IAffiliate>('Affiliate', AffiliateSchema);
