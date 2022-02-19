import { SCHEMA, TABLE_DETAILS } from '../constants';
import models from '../models';
import moment from 'moment';

export const deleteStorage = async (request, response, next) => {
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
    await models.generalDatabaseFunction.deleteDataWhereIn(
      SCHEMA,
      TABLE_DETAILS.notifications.name,
      'process_id',
      ids
    );
    await models.generalDatabaseFunction.deleteDataWhereIn(
      SCHEMA,
      TABLE_DETAILS.invalidTracking.name,
      'process_id',
      ids
    );
    await models.generalDatabaseFunction.deleteDataWhereIn(
      SCHEMA,
      TABLE_DETAILS.tracking.name,
      'process_id',
      ids
    );
    await models.generalDatabaseFunction.deleteDataWhereIn(
      SCHEMA,
      TABLE_DETAILS.userDocumentLogging.name,
      'process_id',
      ids
    );

    const idsb = [];
    const resultb = await models.generalDatabaseFunction.getBeforeDate(
      SCHEMA,
      TABLE_DETAILS.userLogging.name,
      request.body.date_time,
      'login_at'
    );
    for (const item of resultb[0]) {
      idsb.push(item.id);
    }
    await models.generalDatabaseFunction.deleteDataWhereIn(
      SCHEMA,
      TABLE_DETAILS.userLogging.name,
      'id',
      idsb
    );
    await models.generalDatabaseFunction.deleteDataWhereIn(
      SCHEMA,
      TABLE_DETAILS.importprocess.name,
      'id',
      ids
    );
    response.send('Data has been deleted.');
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
