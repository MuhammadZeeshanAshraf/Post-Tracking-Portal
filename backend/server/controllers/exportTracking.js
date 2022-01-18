import path from 'path';
import * as exportTrackingService from '../services/exportTracking';
import models from '../models';

export const exportTrackingWorkSheet = async (request, response, next) => {
  try {
    const errorList = [];
    // const { ProcessId } = request.body;
    // console.log("processId",ProcessId)
    const message = await exportTrackingService.exportTrackingWorksheet(1, models, errorList);
    console.log("path",message)


    response.download(message);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
