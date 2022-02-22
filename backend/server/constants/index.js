import path from 'path';

/* API Keys */
export const CAPTCH_KEY = '366765b9abdb4e32a7a0a200f28872ec';
export const PORT = '5000';

/* Payload Keys */
export const TRACKING_WORKSHEET = 'TrackingWorkSheet';
export const INVALIAD_TRACKING_WORKSHEET = 'NotFunctionalTrackingWorkSheet';
export const PROCESS_ID = 'ProcessId';
export const NAME = 'Name';

/* Extension Constant */
export const CSV_EXTESION = '.csv';
export const XLSX_EXTESION = '.xlsx';

/* Path Contants */
export const INTERNAL_FILES_PATH = path.join(__dirname, '..', 'InternalFiles');

/* Template Sheet Header */
export const TRACKING_SHEET_HEADER = [
    'Tracking ID',
    'Contact Number'
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
export const SCHEMA = 'examin_logistic';
export const BATCH_SIZE = 5000;
export const COLUMN_WIDTH = '25';

export const TABLE_DETAILS = {
    importprocess: {
        name: 'importprocess',
        ddl: {
            file_name: '',
            total_tracking_ids: 0,
            book_ids: 0,
            not_book_ids: 0,
            book_on_same_date: 0,
            not_book_on_same_date: 0,
            total_bill: 0,
            status: 'InProcess',
            total_mobile_numbers: 0,
            total_missing_numbers: 0,
            unique_ids: 0,
            duplicate_ids: 0
        }
    },
    tracking: {
        name: 'tracking',
        ddl: {
            process_id: '',
            type: '',
            booked_at: '',
            tracking_id: '',
            booking_date: '',
            customer_pin_code: '',
            delivery_location: '',
            amount: '',
            book_status: '',
            contact_number: '',
            data_status: ''

        }
    },
    users: {
        name: 'users',
        ddl: {
            name: '',
            email: '',
            primary_phone: '',
            alternative_phone: '',
            dob: '',
            father_name: '',
            mother_name: '',
            password: '',
            active: 0,
            otp: '',
            otp_verified: 'FALSE',
            profile_image: ''
        }
    },
    contactnumbers: {
        name: 'contactnumbers',
        ddl: {
            contact_number: '',
            process_id: ''
        }
    },
    roles: {
        name: 'roles',
        ddl: {
            role: '',
            permission_level: ''
        }
    },
    invalidTracking: {
        name: 'invalid_tracking',
        ddl: {
            process_id: '',
            tracking_id: '',
            contact_number: '',
            file_name: '',
            create_date: ''
        }
    },
    userLogging: {
        name: 'user_logging',
        ddl: {
            user_id: '',
            name: '',
            login_at: '',
            logout_at: '',
            ip_address: '',
            meta_data: ''
        }
    },
    userDocumentLogging: {
        name: 'user_document_logging',
        ddl: {
            user_id: '',
            process_id: '',
            user_name: '',
            perform_at: '',
            action: '',
            description: ''
        }
    },
    notifications: {
        name: 'notifications',
        ddl: {
            process_id: '',
            tracking_id: '',
            notification_type: '',
            description: ''
        }
    }
};

export const WORKBOOK_PROPERTIES = {
    creator: 'Post Tracking Portal',
    lastModifiedBy: 'zeeshan@gmail.com',
    created: new Date(),
    modified: new Date(),
    lastPrinted: new Date(),
    views: [
        {
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: 'visible'
        }
    ],
    defaultColWidth: 25
};

export const EXCELFILE_EXTENSION = '.xlsx';

export const SHEET_HEADER = [
    { header: 'Tracking ID', key: 'tracking_id', width: COLUMN_WIDTH },
    { header: 'Article Type', key: 'TYPE', width: COLUMN_WIDTH },
    { header: 'Booked At', key: 'booked_at', width: COLUMN_WIDTH },
    { header: 'Date of Booking', key: 'booking_date', width: COLUMN_WIDTH },
    { header: 'Destination PIN Code', key: 'customer_pin_code', width: COLUMN_WIDTH },
    { header: 'Delivery Location', key: 'delivery_location', width: COLUMN_WIDTH },
    { header: 'Amount', key: 'amount', width: COLUMN_WIDTH },
    { header: 'Validate (Validation Check)', key: 'book_status', width: COLUMN_WIDTH }
];

export const CUSTOMER_SHEET_HEADER = [
    { header: 'Contact Number', key: 'contact_number', width: COLUMN_WIDTH }
];

export const INVALID_SHEET_HEADER = [
    { header: 'Tracking ID', key: 'tracking_id', width: COLUMN_WIDTH },
    { header: 'Contact Number', key: 'contact_number', width: COLUMN_WIDTH }
];

export const SALTROUND = 10;

export const INVALID_SERIES = [
    '0123456', '6543210',
    '1234567', '7654321',
    '2345678', '8765432',
    '3456789', '9876543',
    '45678910', '01987654',
    '567891011', '110198765',
    '6789101112', '2111019876',
    '78910111213', '31211101987',
    '891011121314', '413121110198'
];

export const PROCESS_STATUS = {
    complete: 'Complete',
    fail: 'Failed',
    inprocess: 'InProcess'
};

export const MINIMAL_ARGS = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
    '--no-sandbox', '--disable-setuid-sandbox',
    "--proxy-server=''", '--proxy-bypass-list=*'
    // '--blink-settings=imagesEnabled=false'
];
