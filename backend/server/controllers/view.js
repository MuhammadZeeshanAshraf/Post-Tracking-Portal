import { SCHEMA, TABLE_DETAILS } from '../constants';
import models from '../models';

export const getNumberByProcessID = async (request, response, next) => {
  try {
    const { process_id } = request.query;
    const result = await models.generalDatabaseFunction.getDatabySingleWhereColumn(
      SCHEMA,
      TABLE_DETAILS.contactnumbers.name,
      'process_id',
      process_id
    );

    response.send({ data: result, count: result.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getInValidByProcessID = async (request, response, next) => {
  try {
    const { process_id } = request.query;
    const result = await models.generalDatabaseFunction.getDatabySingleWhereColumn(
      SCHEMA,
      TABLE_DETAILS.invalidTracking.name,
      'process_id',
      process_id
    );

    response.send({ data: result, count: result.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
