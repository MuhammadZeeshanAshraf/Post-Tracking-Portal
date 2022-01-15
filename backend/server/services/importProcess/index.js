import path from 'path';
import xlsx from 'node-xlsx';
import { INTERNAL_FILES_PATH } from '../../constants';
import { getTrackingSheet, prepareResponse, cleanFileDirectory } from '../utilsServices';
import { processTrackingSheet } from './processTrackingSheet';

export const importTrackingWorkSheet = async (
    filePath,
    errorList
) => {
    try {
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
                /* Cleaning Pervious Captch Images */
                const filepath = path.join(INTERNAL_FILES_PATH, 'images');
                // const abortCheck = await cleanFileDirectory(filepath, errorList);
                const abortCheck = true;
                console.log(abortCheck);
                if (abortCheck) {
                    for (const sheet of trackingSheets) {
                        console.log('Currently Processing Sheet : ', sheet.name);
                        await processTrackingSheet(
                            sheet,
                            errorList
                        );
                    }
                } else {
                    return 'Tarcking IDs Operation Abort';
                }
            }
        }

        const message = await prepareResponse(
            'Processing Post Tracking Worksheet',
            errorList,
            INTERNAL_FILES_PATH
        );
        console.log(message);
        return message;
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};
