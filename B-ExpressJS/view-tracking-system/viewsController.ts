// src/controllers/viewsController.ts
import { Request, Response } from 'express';
import { View } from '../models/viewModel';

export const getViews = async (req: Request, res: Response) => {
    try {
        const views = await View.findOne({});
        res.json(views);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const incrementViews = async (req: Request, res: Response) => {
    try {
        // Increment total views
        await View.updateOne({}, { $inc: { totalViews: 1 } }, { upsert: true });

        // Increment daily views for the current day
        const date = new Date().toISOString().split('T')[0];
        await View.updateOne(
            { 'dailyViews.date': date },
            { $inc: { 'dailyViews.count': 1 } },
            { upsert: true }
        );

        res.json({ message: 'Views incremented successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
