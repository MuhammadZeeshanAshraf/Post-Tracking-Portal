import express from 'express';
import { tableController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';

const router = express.Router();

router.get(
  '/all-import-process',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(tableController.getAllImportProcess)
);

router.get(
  '/all-trackings',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(tableController.getAllTrackings)
);

router.get(
  '/all-invalid-trackings',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(tableController.getAllInValidTrackings)
);

router.get(
  '/all-customers',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(tableController.getAllCustomers)
);

router.get(
  '/user-logging',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(tableController.getAllUserLogging)
);

router.get(
  '/user-document-logging',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(tableController.getAllUserDocsLogging)
);

export default router;
