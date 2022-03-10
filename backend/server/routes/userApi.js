import express from 'express';
import { userController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';

const router = express.Router();

router.post(
  '/register',
  upload.single('profile_image'),
  /* validator.exportTracking , */ asyncHandler(userController.register)
);

router.post(
  '/login',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(userController.postLogin)
);

router.get(
  '/login',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(userController.getLogin)
);

router.get(
  '/logout',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(userController.logout)
);

router.post(
  '/assignRole',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(userController.assignRole)
);

router.post(
  '/verifyotp',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(userController.otpVerfication)
);

router.post(
  '/verifypassword',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(userController.passwordVerfication)
);

router.post(
  '/activeController',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(userController.activationControlller)
);

router.get(
  '/',
  upload.single(''),
  /* validator.exportTracking , */ asyncHandler(userController.getAllUsers)
);

export default router;
