import 'dotenv/config'
import {DateTime, Settings} from 'luxon';
import { schedule } from 'node-cron';
import {CURRENT_SINGLE_DELAY, MORNING_SCHEDULER_TIME, timezoneConfig} from "./settings.mjs";
import {logger} from './src/logger/index.mjs'
import {getLessons} from "./src/features/sendLessonMessageFeature/model/model.mjs";
import {sendMessage} from "./src/features/sendLessonMessageFeature/view/sendMessage/index.mjs";

Settings.defaultZone = timezoneConfig || 'Europe/Moscow';
/** warning! there is an injection of logger in the global object! */
global.logger = logger;

schedule(MORNING_SCHEDULER_TIME, async () => {
    const currentDay = DateTime.local().toFormat('yyyy LLL dd');
    try {
        const currentTime = DateTime.local().toMillis();
        const lessons = await getLessons(currentDay);

        if(!lessons) {
            logger.log({
                level: 'error',
                message: `Scheduler: no lessons for today.`
            });
            return null;
        }

        for(const lesson of lessons) {
            const { studentId: chatId, timestamp } = lesson;
            const alertDate = DateTime.fromMillis(timestamp).minus(CURRENT_SINGLE_DELAY);
            const timeout = alertDate - currentTime;
            const isTimeoutIncorrect = timeout <= 0;

            if(isTimeoutIncorrect) {
                logger.log({
                    level: 'error',
                    message: `Scheduler: incorrect alert date.`
                });
                continue;
            }

            setTimeout(() => {
                sendMessage({ chatId })
            }, timeout);
        }
    } catch (err) {
        logger.log({
            level: 'error',
            message: `Scheduler: ${err.name} - ${err.message}.`
        });
        return null;
    }

})
