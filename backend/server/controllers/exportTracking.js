import path from 'path';
import * as exportTrackingService from '../services/exportTracking';
import models from '../models';

export const exportTrackingWorkSheet = async (request, response, next) => {
  try {
    const errorList = [];
    const { ProcessId } = request.body;
    const message = await exportTrackingService.exportTrackingWorksheet(ProcessId, models, errorList);
    return response.status(200).send({
      message: message
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
