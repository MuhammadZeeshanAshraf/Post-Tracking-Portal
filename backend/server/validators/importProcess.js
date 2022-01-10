import { TRACKING_WORKSHEET, XLSX_EXTESION } from '../constants';
import { checkFileExistanceAndExtension } from '../utils/validator';

const { validationResult, body } = require('express-validator');

export const payloadValidation = [
  body(TRACKING_WORKSHEET).custom(async (value, { req }) => {
    await checkFileExistanceAndExtension(TRACKING_WORKSHEET, XLSX_EXTESION, req, 'creation of import process');
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
