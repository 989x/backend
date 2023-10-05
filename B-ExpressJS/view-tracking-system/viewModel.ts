// src/models/viewModel.ts
import { Schema, model, Document } from 'mongoose';

interface ViewDocument extends Document {
    totalViews: number;
    dailyViews: {
        date: string;
        count: number;
    };
}

const viewSchema = new Schema<ViewDocument>(
    {
        totalViews: {
            type: Number,
            required: true,
            default: 0,
        },
        dailyViews: {
            date: {
                type: String,
                required: true,
                default: "2000-01-01",
            },
            count: {
                type: Number,
                required: true,
                default: 0,
            },
        },
    },
    { collection: 'views' } // Optionally, you can specify the collection name
);

export const View = model<ViewDocument>('View', viewSchema);

// Now, the `dailyViews` field is an object with `date` and `count` properties. 
// This structure allows for a single set of data for each day in `dailyViews`. 
// If a new day arrives, it will update the existing `dailyViews` entry.
