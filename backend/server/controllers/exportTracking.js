import ExcelJS from 'exceljs';
import moment from 'moment';
import path from 'path';
import { CUSTOMER_SHEET_HEADER, EXCELFILE_EXTENSION, INTERNAL_FILES_PATH, INVALIAD_TRACKING_WORKSHEET, INVALID_SHEET_HEADER, SCHEMA, TABLE_DETAILS, TRACKING_WORKSHEET, WORKBOOK_PROPERTIES } from '../constants';
import models from '../models';
import * as exportTrackingService from '../services/exportTracking';
import { getDateCategory, styleWorkBookHeader } from '../services/utilsServices';

export const exportTrackingWorkSheet = async (request, response, next) => {
  try {
    const errorList = [];
    const { ProcessId } = request.query;
    const message = await exportTrackingService.exportTrackingWorksheet(ProcessId, models, errorList);
    response.contentType('application/xlsx');
    response.status(200).sendFile(message);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const exportCustomerWorkSheet = async (request, response, next) => {
  try {
    const data = [];
    const { startDate, endDate } = request.query;
    const dateCategory = getDateCategory(startDate, endDate);
    const result =
      await models.generalDatabaseFunction.getAllDataOrderBy(
        SCHEMA,
        TABLE_DETAILS.contactnumbers.name,
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
    const workbook = new ExcelJS.Workbook(WORKBOOK_PROPERTIES);
    const worksheet = workbook.addWorksheet('Customer Data');
    worksheet.columns = CUSTOMER_SHEET_HEADER;
    for (const row of data) {
      const rowObject = {};
      worksheet.columns[0]._worksheet._columns.forEach(element => {
        rowObject[element._key] = row[element._key];
      });
      worksheet.addRow(rowObject);
    }
    styleWorkBookHeader(workbook);
    const exportPath = path.join(INTERNAL_FILES_PATH, (TRACKING_WORKSHEET + EXCELFILE_EXTENSION));
    await workbook.xlsx.writeFile(exportPath);
    // return exportPath;
    response.contentType('application/xlsx');
    response.status(200).sendFile(exportPath);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const exportInValidTrackingsWorkSheet = async (request, response, next) => {
  try {
    const data = [];
    const { ProcessId } = request.query;
    const result =
      await models.generalDatabaseFunction.getDatabySingleWhereColumn(
        SCHEMA,
        TABLE_DETAILS.invalidTracking.name,
        'process_id',
        ProcessId
      );
    // console.log(result);
    // console.log(ProcessId);
    for (const row of result) {
      const momentDate = moment(row.create_date);
      row.create_date = momentDate.format('YYYY-MM-DD hh:mm:ss A');
    }
    const workbook = new ExcelJS.Workbook(WORKBOOK_PROPERTIES);
    const worksheet = workbook.addWorksheet('InValid Trackign Data');
    worksheet.columns = INVALID_SHEET_HEADER;
    for (const row of data) {
      const rowObject = {};
      worksheet.columns[0]._worksheet._columns.forEach(element => {
        rowObject[element._key] = row[element._key];
      });
      worksheet.addRow(rowObject);
    }
    styleWorkBookHeader(workbook);
    const exportPath = path.join(INTERNAL_FILES_PATH, (INVALIAD_TRACKING_WORKSHEET + EXCELFILE_EXTENSION));
    await workbook.xlsx.writeFile(exportPath);
    // return exportPath;
    response.contentType('application/xlsx');
    response.status(200).sendFile(exportPath);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
