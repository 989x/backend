// routes/searchRoutes.ts

import express from 'express';
import { searchRecords, getRecordById } from '../controllers/searchController';

const router = express.Router();

// Search records
router.get('/records', searchRecords);

// Retrieve a single record by ID
router.get('/records/:id', getRecordById);

export default router;
