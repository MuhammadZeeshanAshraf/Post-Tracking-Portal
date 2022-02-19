import express from 'express';
import { filteringController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';

const router = express.Router();

router.post(
  '/after',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(filteringController.getAfterDate)
);

router.post(
  '/before',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(filteringController.getBeforeDate)
);

router.post(
  '/between',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(filteringController.getBetweenDate)
);

// router.get(
//   '/',
//   upload.single(''),
//   /* validator.exportTracking , */ asyncHandler(roleController.getAllRoles)
// );

// router.post(
//   '/delete',
//   upload.single(''),
//   /* validator.exportTracking , */ asyncHandler(roleController.deleteRole)
// );

// router.post(
//   '/search',
//   upload.single(''),
//   /* validator.exportTracking , */ asyncHandler(roleController.searchRole)
// );

export default router;
