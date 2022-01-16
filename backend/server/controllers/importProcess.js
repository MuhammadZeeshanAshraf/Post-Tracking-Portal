import path from 'path';
import * as importProcessService from '../services/importProcess';
import * as processService from '../services/process';
import models from '../models';

export const importTrackingWorkSheet = async (request, response, next) => {
  try {
    const errorList = [];
    const filePath = path.join(
      __dirname,
      '..',
      'InternalFiles',
      request.file.filename
    );
    const processID = await processService.createProcess(models, errorList);
    if (typeof processID !== 'object' && typeof processID !== 'function') {
      const message = await importProcessService.importTrackingWorkSheet(
        processID,
        filePath,
        errorList,
        models
      );
      response.send(message);
    } else {
      response.send(processID);
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
