import {DateTime} from "luxon";
import {getLessons} from "./model/model.mjs";
import {logger} from "../../logger/index.mjs";
import {CURRENT_SINGLE_DELAY} from "../../../settings.mjs";
import {sendMessage} from "./view/sendMessage/index.mjs";

export const sendLessonFeature = async () => {
    const currentDay = DateTime.local().toFormat('yyyy LLL dd');
    try {
        const currentTime = DateTime.local().toMillis();
        const lessons = await getLessons(currentDay);

        if(!lessons) {
            logger.log({
                level: 'error',
                message: `sendLessonFeature: no lessons for today.`
            });
            return null;
        }

        for(const lesson of lessons) {
            const { studentId: chatId, timestamp } = lesson;

            console.log(typeof chatId, typeof timestamp)
            const alertDate = DateTime.fromMillis(timestamp).minus(CURRENT_SINGLE_DELAY);
            const timeout = alertDate - currentTime;
            const isTimeoutIncorrect = timeout <= 0;

            if(isTimeoutIncorrect) {
                logger.log({
                    level: 'error',
                    message: `sendLessonFeature: incorrect alert date: ${timeout}. Continuing...`
                });
                continue;
            }

            setTimeout(async () => {
                await sendMessage({ chatId });
                logger.log({
                    level: 'error',
                    message: `sendLessonFeature: message sent to ${chatId}.`
                });
            }, timeout);
        }
    } catch (err) {
        logger.log({
            level: 'error',
            message: `sendLessonFeature: ${err.name} - ${err.message}.`
        });
        return null;
    }
}
