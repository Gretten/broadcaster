export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

export const botToken = process.env.TELEGRAM_API_KEY;

export const timezoneConfig = process.env.DEFAULT_TIMEZONE;

/**
 * Options for DateTime
 */
export const delayOptions = {
    oneHour: { hour: 1 },
    twoHours: { hour: 2 },
    threeHours: { hour: 3 },
    sixHours: { hour: 3 }
};

export const CURRENT_SINGLE_DELAY = delayOptions['oneHour'];

/**
 * Scheduler time
 */
export const MORNING_SCHEDULER_TIME = '* 6 * * 1-7';
