import express from 'express';

import importRouter from './importProcessApi';

const router = express.Router();

router.use('/import-process', importRouter);

export default router;
