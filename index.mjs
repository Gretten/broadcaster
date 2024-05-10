import 'dotenv/config'
import {Settings} from 'luxon';
import { schedule } from 'node-cron';
import {MORNING_SCHEDULER_TIME, timezoneConfig} from "./settings.mjs";
import {logger} from './src/logger/index.mjs'
import {sendLessonFeature} from "./src/features/sendLessonMessageFeature/index.mjs";

Settings.defaultZone = timezoneConfig || 'Europe/Moscow';
/** warning! there is an injection of logger in the global object! */
global.logger = logger;

schedule(MORNING_SCHEDULER_TIME, async () => {
    logger.log({
        level: 'info',
        message: 'Morning start...',
    })
    await sendLessonFeature();
});

(async () => {
    logger.log({
        level: 'info',
        message: 'First start...',
    });
    await sendLessonFeature();
})();

process.on('uncaughtException', (err) => {
    logger.log({
        level: 'error',
        message: `Uncaught exception: ${err.message}`,
    })
    return null;
});

process.on('unhandledRejection', (reason) => {
    logger.log({
        level: 'error',
        message: `Unhandled promise rejection: ${reason}`,
    })
    return null;
});
