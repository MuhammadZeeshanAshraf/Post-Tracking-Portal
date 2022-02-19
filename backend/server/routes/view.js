import express from 'express';
import { viewController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';

const router = express.Router();

router.get(
  '/customer-number',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(viewController.getNumberByProcessID)
);

router.get(
  '/invalid-trackings',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(viewController.getInValidByProcessID)
);
export default router;
