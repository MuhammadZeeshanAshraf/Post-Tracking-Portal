import path from 'path';
import xlsx from 'node-xlsx';
import { INTERNAL_FILES_PATH, INVALID_SERIES, SCHEMA, TABLE_DETAILS } from '../../constants';
import {
    doesNumberContainSequence,
    getTrackingSheet,
    doesNumberContainSameDigits,
    isNumeric,
    prepareResponse
} from '../utilsServices';
import { processTrackingSheet } from './processTrackingSheet';
import _, { indexOf } from 'lodash';
import { invalid } from 'moment';
import { count } from 'console';

export const importTrackingWorkSheet = async (
    processID,
    filePath,
    errorList,
    models,
    filename
) => {
    try {
        const scrapData = [];
        const inValidData = [];
        let notifications = {
            noMobileNumber: [],
            notfunctional: []
        };
        const whereObj = { id: processID };
        const updateProcessObj = Object.assign({}, TABLE_DETAILS.importprocess.ddl);
        delete updateProcessObj.file_name;
        console.log('Start Processing Post Tracking Worksheet');
        /**
         * * Reading Tracking worksheet
         */
        const workSheetsFromFile = xlsx.parse(filePath);
        const totalSheets = workSheetsFromFile.length;
        console.log('Total Number of Sheet : ', totalSheets);

        if (totalSheets > 0) {
            /**
             * * geting Tracking sheets
             */
            const trackingSheets = await getTrackingSheet(
                workSheetsFromFile,
                errorList
            );
            console.log('Total Number of Tracking Sheet : ', trackingSheets.length);
            if (trackingSheets.length > 0) {
                let duplicates = [];
                let total = 0;
                let uinque = 0;
                for (const sheet of trackingSheets) {
                    const arr = sheet.data.map(function (obj) {
                        return Object.keys(obj).reduce(function (arr, current) {
                            if (current === 'Tracking ID') {
                                arr.push(obj[current]);
                            }
                            return arr;
                        }, []);
                    });
                    const arr1d = [].concat(...arr);
                    const findDuplicates = (arr) =>
                        arr.filter((item, index) => arr.indexOf(item) != index);
                    duplicates = duplicates.concat([...new Set(findDuplicates(arr1d))]);
                    uinque += [...new Set(arr1d)].length;
                    total += arr1d.length;
                }
                updateProcessObj.duplicate_ids = duplicates.length;
                updateProcessObj.unique_ids = uinque;
                updateProcessObj.total_tracking_ids = total;

                for (const sheet of trackingSheets) {
                    /* Getting Unique Tracking IDs */
                    sheet.data = getUniqueTrakings(sheet, errorList);
                    await models.generalDatabaseFunction.updateSingleRowWithReturn(
                        SCHEMA,
                        TABLE_DETAILS.importprocess.name,
                        updateProcessObj,
                        whereObj
                    );

                    const invalidTrackings = await getInValidTrackings(sheet, models, processID, errorList, filename, notifications);
                    const invalidTrackingsCount = invalidTrackings.count;
                    notifications = invalidTrackings.notifications;
                    /* Handling Phone Number */
                    const contactNumberList = getUniqueContactNumber(sheet, errorList);
                    const numberCount = processContactNumber(models, contactNumberList, errorList, processID);
                    /* End Handling Phone Number */

                    await processTrackingSheet(
                        sheet,
                        updateProcessObj,
                        errorList,
                        scrapData,
                        processID,
                        models,
                        whereObj,
                        invalidTrackingsCount,
                        inValidData,
                        notifications
                    );
                    updateProcessObj.not_book_ids =
                        updateProcessObj.total_tracking_ids - updateProcessObj.book_ids;
                    updateProcessObj.total_mobile_numbers = numberCount;
                    updateProcessObj.total_missing_numbers = Math.abs(total - numberCount);
                    updateProcessObj.not_book_on_same_date =
                        updateProcessObj.total_tracking_ids -
                        updateProcessObj.book_on_same_date;
                }
                updateProcessObj.status = 'Complete';
                await models.generalDatabaseFunction.updateSingleRowWithReturn(
                    SCHEMA,
                    TABLE_DETAILS.importprocess.name,
                    updateProcessObj,
                    whereObj
                );
            }
        }

        const message = await prepareResponse(
            'Processing Post Tracking Worksheet',
            errorList,
            INTERNAL_FILES_PATH
        );
        return notifications;
    } catch (error) {
        errorList.push(error.message);
        // console.log(error);
    }
};

export const workSheetValidation = async (filePath, errorList) => {
    try {
        /**
         * * Reading Tracking worksheet
         */
        const workSheetsFromFile = xlsx.parse(filePath);
        const totalSheets = workSheetsFromFile.length;
        console.log('Total Number of Sheet : ', totalSheets);

        if (totalSheets > 0) {
            /**
             * * geting Tracking sheets
             */
            const trackingSheets = await getTrackingSheet(
                workSheetsFromFile,
                errorList
            );
            // console.log('Total Number of Tracking Sheet : ', trackingSheets.length);
            if (trackingSheets.length > 0) {
                let duplicates = [];
                let total = 0;
                let uinque = 0;

                for (const sheet of trackingSheets) {
                    const arr = sheet.data.map(function (obj) {
                        return Object.keys(obj).reduce(function (arr, current) {
                            if (current === 'Tracking ID') {
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
                }
                return {
                    duplicates: duplicates,
                    total: total,
                    uinque: uinque,
                    duplicatesCount: duplicates.length,
                    uinqueCount: uinque.length,
                    totalCount: total.length
                };
            }
        }

        return errorList;
    } catch (error) {
        errorList.push(error.message);
    }
};

const processContactNumber = (models, contactNumberList, errorList, processID) => {
    const data = [];
    try {
        const invalidPhoneNumber = [];
        for (const number of contactNumberList) {
            if (!isNumeric(number)) {
                invalidPhoneNumber.push(number);
            } else {
                if (Number.isSafeInteger(number)) {
                    const numLength = number.toString().length;
                    if (numLength < 13 && numLength > 9) {
                        if (!doesNumberContainSameDigits(number)) {
                            for (const num of INVALID_SERIES) {
                                if (number.toString().includes(num)) {
                                    invalidPhoneNumber.push(number);
                                }
                            }
                        } else {
                            invalidPhoneNumber.push(number);
                        }
                    } else {
                        invalidPhoneNumber.push(number);
                    }
                } else {
                    invalidPhoneNumber.push(number);
                }
            }
        }

        for (const num of invalidPhoneNumber) {
            contactNumberList.remove(num);
        }

        for (const num of contactNumberList) {
            const obj = Object.assign({}, TABLE_DETAILS.contactnumbers.ddl);
            obj.contact_number = num;
            obj.process_id = processID;
            data.push(obj);
        }

        const count = data.length;
        models.generalDatabaseFunction.insertMultipleRows(SCHEMA, TABLE_DETAILS.contactnumbers.name, data);
        return count;
    } catch (error) {
        // return data.length;
        errorList.push(error.message);
    }
};

export const getUniqueTrakings = (sheet, errorList) => {
    try {
        const resArr = [];
        sheet.data.filter(function (item) {
            const i = resArr.findIndex(
                (x) => x['Tracking ID'] === item['Tracking ID']
            );
            if (i <= -1) {
                resArr.push(item);
            }
            return null;
        });
        return resArr;
    } catch (error) {
        errorList.push(error.message);
        // console.log(error);
    }
};

export const getUniqueContactNumber = (sheet, errorList) => {
    try {
        return sheet.data
            .map((item) => item['Contact Number'])
            .filter((value, index, self) => self.indexOf(value) === index);
    } catch (error) {
        errorList.push(error.message);
        // console.log(error);
    }
};

export const getInValidTrackings = async (sheet, models, processID, errorList, filename, notifications) => {
    try {
        const resArr = [];
        for (const item of sheet.data) {
            const id = item['Tracking ID'];
            if (typeof id === 'string') {
                if (id.length === 13) {
                    if (!(/^[a-zA-Z]{2}[0-9]{1,11}[a-zA-Z]{2}$/gm.test(id))) {
                        resArr.push(item);
                    }
                } else {
                    resArr.push(item);
                }
            } else {
                resArr.push(item);
            }
            if (!item['Contact Number']) {
                const obj = Object.assign({}, TABLE_DETAILS.notifications.ddl);
                obj.process_id = processID;
                obj.notification_type = '1';
                obj.description = `${item['Tracking ID']} has no mobile number.`;
                obj.tracking_id = item['Tracking ID'];
                notifications.noMobileNumber.push(obj);
            }
        }
        const data = [];
        for (const num of resArr) {
            const obj = Object.assign({}, TABLE_DETAILS.invalidTracking.ddl);
            obj.process_id = processID;
            obj.tracking_id = num['Tracking ID'];
            obj.contact_number = num['Contact Number'];
            obj.file_name = filename;
            delete obj.create_date;
            data.push(obj);
            sheet.data.remove(num);

            const objj = Object.assign({}, TABLE_DETAILS.notifications.ddl);
            objj.process_id = processID;
            objj.notification_type = '2';
            objj.description = `${num['Tracking ID']} is not functional.`;
            objj.tracking_id = num['Tracking ID'];
            notifications.notfunctional.push(objj);
        }

        const notificationsClone = _.cloneDeep(notifications);

        models.generalDatabaseFunction.insertMultipleRows(SCHEMA, TABLE_DETAILS.notifications.name, notifications.noMobileNumber);
        models.generalDatabaseFunction.insertMultipleRows(SCHEMA, TABLE_DETAILS.notifications.name, notifications.notfunctional);
        models.generalDatabaseFunction.insertMultipleRows(SCHEMA, TABLE_DETAILS.invalidTracking.name, data);
        return {
            count: data.length,
            notifications: notificationsClone
        };
    } catch (error) {
        errorList.push(error.message);
        // console.log(error);
    }
};

// eslint-disable-next-line no-extend-native
Array.prototype.remove = function (value) {
    for (let i = this.length; i--;) {
        if (this[i] === value) {
            this.splice(i, 1);
        }
    }
};
