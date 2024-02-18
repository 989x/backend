import { Request, Response } from 'express';
import Book from '../models/SearchItem';

export const searchBooks = async (req: Request, res: Response) => {
  const { query, page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const searchResults = await Book.find({
      $or: [
        { title: { $regex: new RegExp(query as string, 'i') } },
        { author: { $regex: new RegExp(query as string, 'i') } },
        { description: { $regex: new RegExp(query as string, 'i') } },
      ],
    })
      .skip(skip)
      .limit(Number(limit));

    const totalResults = await Book.countDocuments({
      $or: [
        { title: { $regex: new RegExp(query as string, 'i') } },
        { author: { $regex: new RegExp(query as string, 'i') } },
        { description: { $regex: new RegExp(query as string, 'i') } },
      ],
    });

    res.json({
      results: searchResults,
      totalResults,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
