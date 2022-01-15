import path from 'path';
import * as importProcessService from '../services/importProcess';

export const importTrackingWorkSheet = async (request, response, next) => {
  try {
    const errorList = [];
    const filePath = path.join(
      __dirname,
      '..',
      'InternalFiles',
      request.file.filename
    );
    const message = await importProcessService.importTrackingWorkSheet(
      filePath,
      errorList
    );
    response.send(message);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
