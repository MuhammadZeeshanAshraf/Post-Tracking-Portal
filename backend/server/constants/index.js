import path from 'path';

/* API Keys */
export const CAPTCH_KEY = '366765b9abdb4e32a7a0a200f28872ec';

/* Payload Keys */
export const TRACKING_WORKSHEET = 'TrackingWorkSheet';

/* Extension Constant */
export const CSV_EXTESION = '.csv';
export const XLSX_EXTESION = '.xlsx';

/* Path Contants */
export const INTERNAL_FILES_PATH = path.join(__dirname, '..', 'InternalFiles');

/* Template Sheet Header */
export const TRACKING_SHEET_HEADER = [
    'Tracking ID'
];

/* Web Constant */
export const MAIN_URL = 'https://www.indiapost.gov.in/VAS/Pages/IndiaPosthome.aspx';
export const TRACKING_ID = '#ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_txtTrackConsign';
export const CAPTCHA_FORMULA = "[id = 'ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_ucCaptcha1_lblCaptcha']";
export const CAPTCHA_IMAGE_ID = "[id = 'ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_ucCaptcha1_imgMathCaptcha']";
export const CAPTCHA_ANSWER = '#ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_ucCaptcha1_txtCaptcha';
export const TRACK_NOW_ID = '#ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_imgSearch1';
export const TABLE_ID = "[id = 'ctl00_PlaceHolderMain_ucNewLegacyControl_gvTrckMailArticleDtlsOER']";
export const INVALID_ID_ERROR_TAG_ID = "[id = 'ctl00_SPWebPartManager1_g_aa197fec_b38c_41a8_b14e_a11722636b37_ctl00_lblValidTrackingError']";
export const NUMERAL_ADJECTIVES = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Fifth: 5,
    Sixth: 6,
    Seventh: 7,
    Eighth: 8,
    Ninth: 9,
    Tenth: 10
};

export const NA = 'NA';
export const NOT_BOOKED = 'Not Booked';
export const BOOKED = 'Booked';
