import express from 'express';
import { deleteController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';

const router = express.Router();

router.delete(
  '/',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(deleteController.deleteStorage)
);

export default router;
