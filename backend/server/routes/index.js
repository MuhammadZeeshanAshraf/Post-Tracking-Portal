import express from 'express';

import importRouter from './importProcessApi';
import exportRouter from './exportTrackingApi';
import userRouter from './userApi';
import roleRouter from './roleApi';
import filteringRouter from './filtering';
import tableRouter from './table';
import viewRouter from './view';
import deleteRouter from './delete';

const router = express.Router();

router.use('/import-process', importRouter);
router.use('/export', exportRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/filtering', filteringRouter);
router.use('/table', tableRouter);
router.use('/view', viewRouter);
router.use('/delete', deleteRouter);
export default router;
