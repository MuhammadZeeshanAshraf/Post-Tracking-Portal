import express from 'express';
import { roleController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';

const router = express.Router();

router.post(
    '/add',
    upload.single(''),
  /* validator.exportTracking , */ asyncHandler(roleController.addRole)
);

router.post(
    '/update',
    upload.single(''),
  /* validator.exportTracking , */ asyncHandler(roleController.updateRole)
);

router.get(
    '/',
    upload.single(''),
  /* validator.exportTracking , */ asyncHandler(roleController.getAllRoles)
);

router.post(
    '/delete',
    upload.single(''),
  /* validator.exportTracking , */ asyncHandler(roleController.deleteRole)
);

router.post(
    '/search',
    upload.single(''),
  /* validator.exportTracking , */ asyncHandler(roleController.searchRole)
);

export default router;
