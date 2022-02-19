import express from 'express';
import { TRACKING_WORKSHEET } from '../constants';
import { exportTrackingController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';

const router = express.Router();

router.get('/tracking-file', upload.single(TRACKING_WORKSHEET), /* validator.exportTracking , */ asyncHandler(exportTrackingController.exportTrackingWorkSheet));

router.get('/invalid-tracking-file', upload.single(TRACKING_WORKSHEET), /* validator.exportTracking , */ asyncHandler(exportTrackingController.exportInValidTrackingsWorkSheet));

router.get('/customer-file', upload.single(TRACKING_WORKSHEET), /* validator.exportTracking , */ asyncHandler(exportTrackingController.exportCustomerWorkSheet));

export default router;
