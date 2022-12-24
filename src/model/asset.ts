import mongoose, { Document, Model } from 'mongoose';

export interface Asset {
    _id: number;
    user_id: number;
    asset: string;
}

const schema = new mongoose.Schema ({
    id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    asset: { type: String, required: true }
},
{
    toJSON: {
        transform: (_, ret): void => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
})

interface AssetModel extends Omit<Asset, '_id'>, Document {}
export const Asset: Model<AssetModel> = mongoose.model('Asset', schema);