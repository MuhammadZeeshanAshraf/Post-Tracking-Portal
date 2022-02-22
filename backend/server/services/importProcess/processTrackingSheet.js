import { evaluate } from 'mathjs';
import moment from 'moment';
import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import randomUseragent from 'random-useragent';
import {
    BOOKED,
    CAPTCHA_ANSWER,
    CAPTCHA_FORMULA,
    CAPTCHA_IMAGE_ID,
    CAPTCH_KEY,
    MAIN_URL,
    MINIMAL_ARGS,
    NUMERAL_ADJECTIVES,
    SCHEMA,
    TABLE_DETAILS,
    TRACKING_ID,
    TRACK_NOW_ID
} from '../../constants';
import { getSheetDetails } from '../utilsServices';

const Client = require('@infosimples/node_two_captcha');

// Declare your client
const client = new Client(CAPTCH_KEY, {
    timeout: 60000,
    polling: 5000,
    throwErrors: false
});

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

export const processTrackingSheet = async (
    sheet,
    updateProcessObj,
    errorList,
    scrapData,
    processID,
    models,
    whereObj,
    invalidTrackings,
    inValidData,
    notifications,
    processDate
) => {
    try {
        if (typeof sheet.data[0] === 'undefined') {
            return false;
        } else {
            let x = 1;
            const records = sheet.data;
            const browser = await puppeteer.launch({
                headless: true,
                timeout: 0,
                args: MINIMAL_ARGS
            });

            while (records.length > 0) {
                // const recordsBatch = records.splice(0, 1);
                const recordsBatch = records.splice(0, 5);
                const recordPromises = [];
                for (const record of recordsBatch) {
                    console.log(x, '==>', record['Tracking ID']);
                    recordPromises.push(
                        processSingleTrackingID(
                            record['Tracking ID'],
                            browser,
                            errorList,
                            scrapData,
                            processID,
                            updateProcessObj,
                            records,
                            models,
                            record['Contact Number'],
                            invalidTrackings,
                            inValidData,
                            notifications,
                            processDate
                        )
                    );
                    x++;
                }
                await Promise.all(recordPromises);
                models.generalDatabaseFunction.insertMultipleRows(
                    SCHEMA,
                    TABLE_DETAILS.tracking.name,
                    scrapData
                );
                models.generalDatabaseFunction.insertMultipleRows(
                    SCHEMA,
                    TABLE_DETAILS.invalidTracking.name,
                    inValidData
                );

                updateProcessObj.not_book_ids = updateProcessObj.total_tracking_ids - updateProcessObj.book_ids;
                // updateProcessObj.not_book_ids = invalidTrackings;
                updateProcessObj.not_book_on_same_date =
                    updateProcessObj.total_tracking_ids -
                    updateProcessObj.book_on_same_date;
                await models.generalDatabaseFunction.updateSingleRowWithReturn(
                    SCHEMA,
                    TABLE_DETAILS.importprocess.name,
                    updateProcessObj,
                    whereObj
                );
            }
            await browser.close();
        }
    } catch (error) {
        errorList.push(error.message);
        console.log(error);
    }
};

const processSingleTrackingID = async (
    trackingID,
    browser,
    errorList,
    scrapData,
    processID,
    updateProcessObj,
    records,
    models,
    contactNumber,
    invalidTrackings,
    inValidData,
    notifications,
    processDate
) => {
    const momentDate = moment(processDate);
    processDate = momentDate.format('DD/MM/YYYY');

    const page = await browser.newPage();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    try {
        await page.setUserAgent(randomUseragent.getRandom());
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(MAIN_URL, {
            waitUntil: 'domcontentloaded',
            timeout: 12000
        });
        await page.type(TRACKING_ID, trackingID);

        const element = await page.waitForSelector(CAPTCHA_FORMULA);
        const captchaQuestion = await element.evaluate((el) => el.textContent);
        // console.log(captchaQuestion);
        // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        const image = await page.waitForSelector(CAPTCHA_IMAGE_ID, {
            timeout: 12000
        });
        const src = await image.evaluate((el) => el.src);
        // console.log(src);
        const catchResponse = await client.decode({
            url: src
        });
        // console.log('catchResponse :- ', catchResponse);

        let answer = '';
        if (captchaQuestion === 'Evaluate the Expression') {
            if (catchResponse.text.length < 3) {
                answer = catchResponse.text;
            } else {
                const editedText = catchResponse.text.slice(0, -1);
                answer = evaluate(editedText);
            }
        } else if (captchaQuestion === 'Enter characters as displayed in image') {
            answer = catchResponse.text;
        } else {
            const words = captchaQuestion.split(' ');
            const numberWord = NUMERAL_ADJECTIVES[words[2]];
            const arr = catchResponse.text.split('');
            // console.log(arr);
            answer = arr[numberWord - 1];
        }
        answer = answer.toString();
        // console.log('Answer', answer);
        await page.type(CAPTCHA_ANSWER, answer);

        await page.click(TRACK_NOW_ID);
        await page.waitForNavigation({
            waitUntil: 'domcontentloaded',
            timeout: 120000
        });

        const data = await page.$$eval('table tr td', (tds) =>
            tds.map((td) => {
                return td.innerText;
            })
        );

        // console.log(data.length);
        if (data.length > 3) {
            let sameDate = 'No';
            updateProcessObj.book_ids++;
            const aDate = data[1].split(' ');
            if (processDate === aDate[0]) {
                updateProcessObj.book_on_same_date++;
                sameDate = 'Yes';
            }

            if (data.length < 30 || data[0] === 'Registered Printed Book') {
                updateProcessObj.total_bill =
                    updateProcessObj.total_bill + 0;
                scrapData.push({
                    process_id: processID,
                    tracking_id: trackingID,
                    booking_date: `${data[1]} ${data[2]}`,
                    customer_pin_code: 'NaN',
                    amount: '0',
                    book_status: BOOKED,
                    type: data[0],
                    booked_at: data[3],
                    delivery_location: 'NaN',
                    contact_number: contactNumber,
                    data_status: 'InComplete Data',
                    same_date: sameDate
                });
            } else {
                const amountCheck = 1 + parseFloat(data[3]);
                if (Number.isNaN(amountCheck) || amountCheck === '' || amountCheck === null) {
                    updateProcessObj.total_bill =
                        updateProcessObj.total_bill + 0;
                    scrapData.push({
                        process_id: processID,
                        tracking_id: trackingID,
                        booking_date: data[1],
                        customer_pin_code: 'NaN',
                        amount: '0',
                        book_status: BOOKED,
                        type: data[2],
                        booked_at: data[0],
                        delivery_location: data[3],
                        contact_number: contactNumber,
                        data_status: 'InComplete Data',
                        same_date: sameDate
                    });
                } else {
                    updateProcessObj.total_bill =
                        updateProcessObj.total_bill + parseFloat(data[3]);
                    scrapData.push({
                        process_id: processID,
                        tracking_id: trackingID,
                        booking_date: data[1],
                        customer_pin_code: data[2],
                        amount: data[3],
                        book_status: BOOKED,
                        type: data[4],
                        booked_at: data[0],
                        delivery_location: data[5],
                        contact_number: contactNumber,
                        data_status: 'Full Data',
                        same_date: sameDate
                    });
                }
            }
            if (!await page.isClosed()) {
                await page.goto('about:blank');
                const url = await page.url();
                if (url === 'about:blank') {
                    await page.close();
                }
            }
            return true;
        } else {
            const obj = Object.assign({}, TABLE_DETAILS.invalidTracking.ddl);
            obj.process_id = processID;
            obj.tracking_id = trackingID;
            obj.contact_number = contactNumber;
            obj.create_date = `${yyyy}-${mm}-${dd}`;
            inValidData.push(obj);
            invalidTrackings++;
            const objj = Object.assign({}, TABLE_DETAILS.notifications.ddl);
            objj.process_id = processID;
            objj.notification_type = '2';
            objj.description = `${trackingID} is not functional.`;
            objj.tracking_id = trackingID;
            notifications.notfunctional.push(obj);
            if (!await page.isClosed()) {
                await page.goto('about:blank');
                const url = await page.url();
                if (url === 'about:blank') {
                    await page.close();
                }
            }
            return true;
        }
    } catch (error) {
        if (!await page.isClosed()) {
            await page.goto('about:blank');
            const url = await page.url();
            if (url === 'about:blank') {
                await page.close();
            }
        }
        // console.log(error);
        records.push({
            'Tracking ID': trackingID,
            'Contact Number': contactNumber
        });
        errorList.push(error.message);
        return true;
    }
};
