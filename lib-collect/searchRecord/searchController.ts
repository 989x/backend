// controllers/searchController.ts

import { Request, Response } from 'express';
import SearchRecord, { SearchRecordDocument } from '../models/searchRecord';

export const searchRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    let query = (req.query.q || '').toString().slice(0, 100); // Limit the query to 100 characters

    const existingRecord = await SearchRecord.findOne({ query });

    if (existingRecord) {
      existingRecord.count += 1;
      await existingRecord.save();
      res.json(existingRecord);
    } else {
      const newRecord = new SearchRecord({ query, count: 1, tag: "estate", date: new Date().toISOString().slice(0, 10) });
      await newRecord.save();
      res.json(newRecord);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRecordById = async (req: Request, res: Response): Promise<void> => {
  try {
    const record = await SearchRecord.findById(req.params.id);
    if (!record) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json(record);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
