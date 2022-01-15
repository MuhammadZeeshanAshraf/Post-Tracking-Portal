import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import randomUseragent from 'random-useragent';
import path from 'path';
import { Solver } from '2captcha';
import fs from 'fs';
import {
    evaluate
} from 'mathjs';
import { BOOKED, CAPTCHA_ANSWER, CAPTCHA_FORMULA, CAPTCHA_IMAGE_ID, CAPTCH_KEY, INTERNAL_FILES_PATH, MAIN_URL, NA, NOT_BOOKED, NUMERAL_ADJECTIVES, TABLE_ID, TRACKING_ID, TRACK_NOW_ID } from '../../constants';
import { saveImageToDisk } from '../utilsServices';
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

const Client = require('@infosimples/node_two_captcha');

// Declare your client
const client = new Client(CAPTCH_KEY, {
    timeout: 60000,
    polling: 5000,
    throwErrors: false
});

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const solver = new Solver('366765b9abdb4e32a7a0a200f28872ec');

export const processTrackingSheet = async (
    sheet,
    errorList
) => {
    try {
        if (typeof sheet.data[0] === 'undefined') {
            return false;
        } else {
            const scrapData = [];
            let x = 1;
            const records = sheet.data;
            const browser = await puppeteer.launch({
                headless: false,
                ignoreHTTPSErrors: true,
                defaultViewport: null,
                args: ['--start-maximized']
            });
            while (records.length > 0) {
                const recordsBatch = records.splice(0, 1);
                const recordPromises = [];
                for (const record of recordsBatch) {
                    console.log(x, '==>', record['Tracking ID']);
                    recordPromises.push(processSingleTrackingID(record['Tracking ID'], browser, errorList, scrapData));
                    x++;
                }
                await Promise.all(recordPromises);
            }
            console.log(scrapData);
            // await browser.close();
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
    scrapData
) => {
    try {
        const page = await browser.newPage();
        await page.setUserAgent(randomUseragent.getRandom());
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(MAIN_URL, { waitUntil: 'domcontentloaded', timeout: 0 });
        await page.type(TRACKING_ID, trackingID);

        const element = await page.waitForSelector(CAPTCHA_FORMULA);
        const captchaQuestion = await element.evaluate(el => el.textContent);
        console.log(captchaQuestion);
        // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        const image = await page.waitForSelector(CAPTCHA_IMAGE_ID, { timeout: 3000 });
        const src = await image.evaluate(el => el.src);
        console.log(src);
        const catchResponse = await client.decode({
            url: src
        });
        console.log('catchResponse :- ', catchResponse.text);

        let answer = '';
        if (captchaQuestion === 'Evaluate the Expression') {
            if (catchResponse.text.length === 1) {
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
            console.log(arr);
            answer = arr[numberWord - 1];
        }
        await page.type(CAPTCHA_ANSWER, answer);
        console.log('Answer', answer);
        await page.click(TRACK_NOW_ID);
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 0 });

        const data = await page.$$eval('table tr td', tds => tds.map((td) => {
            return td.innerText;
        }));

        if (data.length > 3) {
            scrapData.push({
                'Tracking ID': trackingID,
                'Date of Booking': data[1],
                'Customer PIN Code': data[2],
                Amount: data[3],
                'Validate (Validation Check)': BOOKED
            });
            return true;
        } else {
            scrapData.push({
                'Tracking ID': trackingID,
                'Date of Booking': NA,
                'Customer PIN Code': NA,
                Amount: NA,
                'Validate (Validation Check)': NOT_BOOKED
            });
            return true;
        }
    } catch (error) {
        scrapData.push({
            'Tracking ID': trackingID,
            'Date of Booking': NA,
            'Customer PIN Code': NA,
            Amount: NA,
            'Validate (Validation Check)': NOT_BOOKED
        });
        errorList.push(error.message);
        console.log(error);
        return true;
    }
};
