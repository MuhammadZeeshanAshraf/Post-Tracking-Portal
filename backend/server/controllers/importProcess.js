import path from 'path';
import * as importProcessService from '../services/importProcess';
import * as processService from '../services/process';
import models from '../models';
import { PROCESS_STATUS, SCHEMA, TABLE_DETAILS } from '../constants';
import moment from 'moment';

export const importTrackingWorkSheet = async (request, response, next) => {
  try {
    const errorList = [];
    const filePath = path.join(
      __dirname,
      '..',
      'InternalFiles',
      request.file.filename
    );
    const { Name, UserId, UserName, processDate } = request.body;
    const processID = await processService.createProcess(Name, models, errorList);
    if (typeof processID !== 'object' && typeof processID !== 'function') {
      const userlog = Object.assign({}, TABLE_DETAILS.userDocumentLogging.ddl);
      userlog.user_id = UserId;
      userlog.user_name = UserName;
      userlog.process_id = processID;
      userlog.action = 'Upload';
      userlog.description = 'Uploaded tracking excel file for processing.';
      userlog.perform_at = moment(new Date()).format('YYYY-MM-DD hh:mm:ss A');
      await models.generalDatabaseFunction.insertSingleRowWithReturn(SCHEMA, TABLE_DETAILS.userDocumentLogging.name, userlog, 'id');

      const message = await importProcessService.importTrackingWorkSheet(
        processID,
        filePath,
        errorList,
        models,
        Name,
        processDate
      );
      response.send(message);
      // response.send('Ok');
    } else {
      response.send(processID);
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getTrackingWorkData = async (request, response, next) => {
  try {
    let trackingData = [];
    const processID =
      await models.generalDatabaseFunction.getComplexMaxByColumn(
        SCHEMA,
        TABLE_DETAILS.importprocess.name,
        'id',
        {}
      );
    const totalData = await models.generalDatabaseFunction.getDatabySingleWhereColumn(
      SCHEMA,
      TABLE_DETAILS.importprocess.name,
      'id',
      processID
    );

    const notificationsData =
      await models.generalDatabaseFunction.getDatabySingleWhereColumn(
        SCHEMA,
        TABLE_DETAILS.notifications.name,
        'process_id',
        processID
      );

    const total = totalData[0].total_tracking_ids;
    trackingData =
      await models.generalDatabaseFunction.getDatabySingleWhereColumn(
        SCHEMA,
        TABLE_DETAILS.tracking.name,
        'process_id',
        processID
      );
    response.send({
      trackingData: trackingData,
      notificationsData: notificationsData,
      notificationsCount: notificationsData.length,
      total: total
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getProcessHistory = async (request, response, next) => {
  try {
    const trackingData =
      await models.generalDatabaseFunction.getAllData(
        SCHEMA,
        TABLE_DETAILS.importprocess.name
      );
    response.send(trackingData.reverse());
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getProcessData = async (request, response, next) => {
  try {
    const { ProcessId } = request.body;
    let trackingData = [];
    const totalData = await models.generalDatabaseFunction.getDatabySingleWhereColumn(
      SCHEMA,
      TABLE_DETAILS.importprocess.name,
      'id',
      ProcessId
    );
    const total = totalData[0].total_tracking_ids;
    trackingData =
      await models.generalDatabaseFunction.getDatabySingleWhereColumn(
        SCHEMA,
        TABLE_DETAILS.tracking.name,
        'process_id',
        ProcessId
      );
    const notificationsData =
      await models.generalDatabaseFunction.getDatabySingleWhereColumn(
        SCHEMA,
        TABLE_DETAILS.notifications.name,
        'process_id',
        ProcessId
      );
    response.send({
      total: total,
      trackingData: trackingData,
      notificationsData: notificationsData,
      notificationsCount: notificationsData.length
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

/* export const TrackingWorkSheetValidation = async (request, response, next) => {
  try {
    const errorList = [];
    const filePath = path.join(
      __dirname,
      '..',
      'InternalFiles',
      request.file.filename
    );
    const { Name } = request.body;
    const processID = await processService.createProcess(Name, models, errorList);
    if (typeof processID !== 'object' && typeof processID !== 'function') {
      const message = await importProcessService.TrackingWorkSheetValidationService(
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
 */
export const workSheetValidation = async (request, response, next) => {
  try {
    const errorList = [];
    const filePath = path.join(
      __dirname,
      '..',
      'InternalFiles',
      request.file.filename
    );
    const message = await importProcessService.workSheetValidation(
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

export const workSheetEditorValidation = async (request, response, next) => {
  try {
    if (request.body.length > 0) {
      let duplicates = [];
      let total = 0;
      let uinque = 0;

      const arr = request.body.map(function (obj) {
        return Object.keys(obj).reduce(function (arr, current) {
          if (current === 'TrackingID') {
            arr.push(obj[current]);
          }
          return arr;
        }, []);
      });
      const arr1d = [].concat(...arr);
      const findDuplicates = (arr) =>
        arr.filter((item, index) => arr.indexOf(item) != index);
      duplicates = duplicates.concat([...new Set(findDuplicates(arr1d))]);
      uinque = [...new Set(arr1d)];
      total = arr1d;

      response.send({
        duplicates: duplicates,
        total: total,
        uinque: uinque,
        duplicatesCount: duplicates.length,
        uinqueCount: uinque.length,
        totalCount: total.length
      });
    } else {
      response.send({
        duplicates: [],
        total: [],
        uinque: [],
        duplicatesCount: 0,
        uinqueCount: 0,
        totalCount: 0
      });
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const importTrackingEditor = async (request, response, next) => {
  try {
    const errorList = [];
    if (request.body.length > 0) {
      const data = [];
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const HH = today.getHours();
      const MM = today.getMinutes();
      const SS = today.getSeconds();
      const Name = `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS} Editor`;
      for (const item of request.body) {
        data.push({
          'Tracking ID': item.TrackingID,
          'Contact Number': item.ContactNumber
        });
      }
      const processID = await processService.createProcess(Name, models, errorList);
      if (typeof processID !== 'object' && typeof processID !== 'function') {
        const message = await importProcessService.importTrackingWorkSheetEditor(
          processID,
          data,
          errorList,
          models
        );
        response.send(message);
      } else {
        response.send(processID);
      }
    } else {
      response.send({
        message: 'No tracking ids are porvided.'
      });
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getProcessStatus = async (request, response, next) => {
  try {
    const count = await models.generalDatabaseFunction.getCount(SCHEMA,
      TABLE_DETAILS.importprocess.name, {
      status: PROCESS_STATUS.inprocess
    }, ['status']);
    response.send(count[0]);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getAllProcessData = async (request, response, next) => {
  try {
    const result =
      await models.generalDatabaseFunction.getAllDataOrderBy(
        SCHEMA,
        TABLE_DETAILS.importprocess.name,
        'id'
      );
    response.send(result);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getAllTrackingData = async (request, response, next) => {
  try {
    const result =
      await models.generalDatabaseFunction.getAllDataOrderBy(
        SCHEMA,
        TABLE_DETAILS.tracking.name,
        'process_id'
      );
    response.send(result);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getStatistics = async (request, response, next) => {
  try {
    let query;
    let { startDate, endDate } = request.query;

    if (typeof startDate !== 'undefined' && typeof endDate === 'undefined') {
      const startMomentDate = moment(startDate);
      startDate = startMomentDate.format('YYYY-MM-DD hh:mm:ss');
      query = `SELECT sum(CAST(total_tracking_ids AS UNSIGNED)) as order_shipped,
                  sum(CAST(book_ids AS UNSIGNED)) as order_booked,
                  sum(CAST(total_bill AS DECIMAL)) as booked_amount,
                  sum(CAST(not_book_ids AS UNSIGNED)) as shipping_alert,
                  sum(CAST(total_mobile_numbers AS UNSIGNED)) as all_customer_numbers,
                  sum(CAST(total_missing_numbers AS UNSIGNED)) as totall_number_missing
                  FROM  ${SCHEMA}.${TABLE_DETAILS.importprocess.name}
                  where create_date  > timestamp '${startDate}'`;
    } else if (typeof startDate === 'undefined' && typeof endDate !== 'undefined') {
      const endMomentDate = moment(endDate);
      endDate = endMomentDate.format('YYYY-MM-DD hh:mm:ss');
      query = `SELECT sum(CAST(total_tracking_ids AS UNSIGNED)) as order_shipped,
                  sum(CAST(book_ids AS UNSIGNED)) as order_booked,
                  sum(CAST(total_bill AS DECIMAL)) as booked_amount,
                  sum(CAST(not_book_ids AS UNSIGNED)) as shipping_alert,
                  sum(CAST(total_mobile_numbers AS UNSIGNED)) as all_customer_numbers,
                  sum(CAST(total_missing_numbers AS UNSIGNED)) as totall_number_missing
                  FROM  ${SCHEMA}.${TABLE_DETAILS.importprocess.name}
                  where create_date  < timestamp '${endDate}'`;
    } else if (typeof startDate !== 'undefined' && typeof endDate !== 'undefined') {
      const startMomentDate = moment(startDate);
      const endMomentDate = moment(endDate);
      startDate = startMomentDate.format('YYYY-MM-DD hh:mm:ss');
      endDate = endMomentDate.format('YYYY-MM-DD hh:mm:ss');
      query = `SELECT sum(CAST(total_tracking_ids AS UNSIGNED)) as order_shipped,
                  sum(CAST(book_ids AS UNSIGNED)) as order_booked,
                  sum(CAST(total_bill AS DECIMAL)) as booked_amount,
                  sum(CAST(not_book_ids AS UNSIGNED)) as shipping_alert,
                  sum(CAST(total_mobile_numbers AS UNSIGNED)) as all_customer_numbers,
                  sum(CAST(total_missing_numbers AS UNSIGNED)) as totall_number_missing
                  FROM  ${SCHEMA}.${TABLE_DETAILS.importprocess.name}
                  where create_date > timestamp '${startDate}'
                  and create_date  < timestamp '${endDate}'`;
    } else {
      query = `SELECT sum(CAST(total_tracking_ids AS UNSIGNED)) as order_shipped,
                  sum(CAST(book_ids AS UNSIGNED)) as order_booked,
                  sum(CAST(total_bill AS DECIMAL)) as booked_amount,
                  sum(CAST(not_book_ids AS UNSIGNED)) as shipping_alert,
                  sum(CAST(total_mobile_numbers AS UNSIGNED)) as all_customer_numbers,
                  sum(CAST(total_missing_numbers AS UNSIGNED)) as totall_number_missing
                  FROM  ${SCHEMA}.${TABLE_DETAILS.importprocess.name}`;
    }

    const result =
      await models.generalDatabaseFunction.rawQueryExceutor(query);
    response.send(result[0][0]);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
