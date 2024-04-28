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
    await sendLessonFeature();
});

(async () => {
    await sendLessonFeature();
    console.log('The application has started for the first time.');
    logger.log({
        level: 'info',
        message: 'First start.',
    })
})();

