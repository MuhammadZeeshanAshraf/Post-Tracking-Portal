import { SCHEMA, TABLE_DETAILS } from '../constants';
import models from '../models';
import moment from 'moment';
import { getDateCategory } from '../services/utilsServices';

export const getAllImportProcess = async (request, response, next) => {
  try {
    const data = [];
    const { startDate, endDate } = request.query;
    const dateCategory = getDateCategory(startDate, endDate);
    const result =
      await models.generalDatabaseFunction.getAllDataOrderBy(
        SCHEMA,
        TABLE_DETAILS.importprocess.name,
        'id'
      );

    for (const row of result) {
      const momentDate = moment(row.create_date);
      row.create_date = momentDate.format('YYYY-MM-DD hh:mm:ss A');
      if (dateCategory === 1) {
        if (momentDate.isAfter(startDate)) {
          data.push(row);
        };
      } else if (dateCategory === 2) {
        if (momentDate.isBefore(endDate)) {
          data.push(row);
        };
      } else if (dateCategory === 3) {
        if (momentDate.isBetween(startDate, endDate)) {
          data.push(row);
        };
      } else {
        data.push(row);
      }
    }
    response.send({ data: data, count: data.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getAllTrackings = async (request, response, next) => {
  try {
    const data = [];
    const { startDate, endDate } = request.query;
    const dateCategory = getDateCategory(startDate, endDate);
    const result =
      await models.generalDatabaseFunction.getAllDataOrderBy(
        SCHEMA,
        TABLE_DETAILS.tracking.name,
        'process_id'
      );

    for (const row of result) {
      const momentDate = moment(row.booking_date);
      row.booking_date = momentDate.format('YYYY-MM-DD hh:mm:ss A');
      if (dateCategory === 1) {
        if (momentDate.isAfter(startDate)) {
          data.push(row);
        };
      } else if (dateCategory === 2) {
        if (momentDate.isBefore(endDate)) {
          data.push(row);
        };
      } else if (dateCategory === 3) {
        if (momentDate.isBetween(startDate, endDate)) {
          data.push(row);
        };
      } else {
        data.push(row);
      }
    }
    response.send({ data: data, count: data.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getAllInValidTrackings = async (request, response, next) => {
  try {
    const data = [];
    const { startDate, endDate } = request.query;
    const dateCategory = getDateCategory(startDate, endDate);
    const result =
      await models.generalDatabaseFunction.getAllDataOrderBy(
        SCHEMA,
        TABLE_DETAILS.invalidTracking.name,
        'process_id'
      );
    for (const row of result) {
      const momentDate = moment(row.create_date);
      row.create_date = momentDate.format('YYYY-MM-DD hh:mm:ss A');
      if (dateCategory === 1) {
        if (momentDate.isAfter(startDate)) {
          data.push(row);
        };
      } else if (dateCategory === 2) {
        if (momentDate.isBefore(endDate)) {
          data.push(row);
        };
      } else if (dateCategory === 3) {
        if (momentDate.isBetween(startDate, endDate)) {
          data.push(row);
        };
      } else {
        data.push(row);
      }
    }
    response.send({ data: data, count: data.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getAllCustomers = async (request, response, next) => {
  try {
    const data = [];
    const { startDate, endDate } = request.query;
    const dateCategory = getDateCategory(startDate, endDate);
    const result =
      await models.generalDatabaseFunction.getAllDataOrderByWithSelectiveColumns(
        SCHEMA,
        TABLE_DETAILS.importprocess.name,
        'id',
        ['id', 'create_date', 'file_name', 'total_mobile_numbers']
      );

    for (const row of result) {
      const momentDate = moment(row.create_date);
      row.create_date = momentDate.format('YYYY-MM-DD hh:mm:ss A');
      if (dateCategory === 1) {
        if (momentDate.isAfter(startDate)) {
          data.push(row);
        };
      } else if (dateCategory === 2) {
        if (momentDate.isBefore(endDate)) {
          data.push(row);
        };
      } else if (dateCategory === 3) {
        if (momentDate.isBetween(startDate, endDate)) {
          data.push(row);
        };
      } else {
        data.push(row);
      }
    }
    response.send({ data: data, count: data.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getAllUserLogging = async (request, response, next) => {
  try {
    const data = [];
    const { startDate, endDate } = request.query;
    const dateCategory = getDateCategory(startDate, endDate);
    const result =
      await models.generalDatabaseFunction.getAllDataOrderBy(
        SCHEMA,
        TABLE_DETAILS.userLogging.name,
        'id'
      );
    for (const row of result) {
      const momentDate = moment(row.login_at);
      row.login_at = momentDate.format('YYYY-MM-DD hh:mm:ss A');
      if (dateCategory === 1) {
        if (momentDate.isAfter(startDate)) {
          data.push(row);
        };
      } else if (dateCategory === 2) {
        if (momentDate.isBefore(endDate)) {
          data.push(row);
        };
      } else if (dateCategory === 3) {
        if (momentDate.isBetween(startDate, endDate)) {
          data.push(row);
        };
      } else {
        data.push(row);
      }
    }
    response.send({ data: data, count: data.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getAllUserDocsLogging = async (request, response, next) => {
  try {
    const data = [];
    const { startDate, endDate } = request.query;
    const dateCategory = getDateCategory(startDate, endDate);
    const result =
      await models.generalDatabaseFunction.getAllDataOrderBy(
        SCHEMA,
        TABLE_DETAILS.userDocumentLogging.name,
        'id'
      );
    for (const row of result) {
      const momentDate = moment(row.perform_at);
      row.perform_at = momentDate.format('YYYY-MM-DD hh:mm:ss A');
      if (dateCategory === 1) {
        if (momentDate.isAfter(startDate)) {
          data.push(row);
        };
      } else if (dateCategory === 2) {
        if (momentDate.isBefore(endDate)) {
          data.push(row);
        };
      } else if (dateCategory === 3) {
        if (momentDate.isBetween(startDate, endDate)) {
          data.push(row);
        };
      } else {
        data.push(row);
      }
    }
    response.send({ data: data, count: data.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
