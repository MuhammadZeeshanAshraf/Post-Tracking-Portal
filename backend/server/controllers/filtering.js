import { SCHEMA, TABLE_DETAILS } from '../constants';
import models from '../models';

export const getAfterDate = async (request, response, next) => {
  try {
    const ids = [];
    const result = await models.generalDatabaseFunction.getAfterDate(
      SCHEMA,
      TABLE_DETAILS.importprocess.name,
      request.body.date_time
    );
    for (const item of result[0]) {
      ids.push(item.id);
    }
    const trackings = await models.generalDatabaseFunction.getDatabyWhereIn(
      SCHEMA,
      TABLE_DETAILS.tracking.name,
      'process_id',
      ids
    );
    response.send({
      process: result[0],
      trackings: trackings
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getBeforeDate = async (request, response, next) => {
  try {
    const ids = [];
    const result = await models.generalDatabaseFunction.getBeforeDate(
      SCHEMA,
      TABLE_DETAILS.importprocess.name,
      request.body.date_time,
      'create_date'
    );
    for (const item of result[0]) {
      ids.push(item.id);
    }
    const trackings = await models.generalDatabaseFunction.getDatabyWhereIn(
      SCHEMA,
      TABLE_DETAILS.tracking.name,
      'process_id',
      ids
    );
    response.send({
      process: result[0],
      trackings: trackings
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getBetweenDate = async (request, response, next) => {
  try {
    const ids = [];
    const result = await models.generalDatabaseFunction.getBetweenDate(
      SCHEMA,
      TABLE_DETAILS.importprocess.name,
      request.body.start_date_time,
      request.body.end_date_time
    );
    for (const item of result[0]) {
      ids.push(item.id);
    }
    const trackings = await models.generalDatabaseFunction.getDatabyWhereIn(
      SCHEMA,
      TABLE_DETAILS.tracking.name,
      'process_id',
      ids
    );
    response.send({
      process: result[0],
      trackings: trackings
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
