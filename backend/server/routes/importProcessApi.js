import express from 'express';
import { TRACKING_WORKSHEET } from '../constants';
import { importProcessController } from '../controllers';
import upload from '../middlewares/upload';
import { asyncHandler } from '../utils/api';
import { validator } from '../validators/index';

const router = express.Router();

router.post(
    '/',
    upload.single(TRACKING_WORKSHEET),
    validator.importProcess,
    asyncHandler(importProcessController.importTrackingWorkSheet)
);

router.post(
    '/validation',
    upload.single(TRACKING_WORKSHEET),
    validator.importProcess,
    asyncHandler(importProcessController.workSheetValidation)
);

router.post(
    '/validation-editor',
    upload.single(TRACKING_WORKSHEET),

    asyncHandler(importProcessController.workSheetEditorValidation)
);

router.get(
    '/data',
    upload.single(TRACKING_WORKSHEET),
    asyncHandler(importProcessController.getTrackingWorkData)
);

router.get(
    '/history',
    upload.single(TRACKING_WORKSHEET),
    asyncHandler(importProcessController.getProcessHistory)
);

router.get(
    '/data-by-id',
    upload.single(TRACKING_WORKSHEET),
    validator.getProcessData,
    asyncHandler(importProcessController.getProcessData)
);

router.post(
    '/editor',
    upload.single(TRACKING_WORKSHEET),
    /* validator.importProcess, */
    asyncHandler(importProcessController.importTrackingEditor)
);

router.get(
    '/checkStatus',
    /* upload.single(TRACKING_WORKSHEET), */
    asyncHandler(importProcessController.getProcessStatus)
);

router.get(
    '/allData',
    upload.single(TRACKING_WORKSHEET),
    asyncHandler(importProcessController.getAllProcessData)
);

router.get(
    '/allTrackingData',
    upload.single(TRACKING_WORKSHEET),
    asyncHandler(importProcessController.getAllTrackingData)
);

router.get(
    '/statistics',
    upload.single(TRACKING_WORKSHEET),
    asyncHandler(importProcessController.getStatistics)
);
export default router;
