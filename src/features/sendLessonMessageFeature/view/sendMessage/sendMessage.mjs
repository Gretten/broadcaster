import axios from "axios";
import {lessonsMessage} from "../../model/model.mjs";
import {createKeyboard} from "../../model/createKeyboard/createKeyboard.mjs";
import {buttons} from "../../model/constants/constants.mjs";
import {botToken} from '../../../../../settings.mjs'

export const sendMessage = async ({ chatId, token = botToken }) => {
    if(!chatId) {
        logger.log({
            level: 'error',
            message: `sendMessage: no studentId given`
        });
        return null;
    }
    try {

        const keyboard = createKeyboard(buttons);
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        await axios.post(url, {
            chat_id: chatId,
            text: lessonsMessage(),
            reply_markup: keyboard
        });
    } catch (error) {
        logger.log({
            level: 'error',
            message: `sendMessage: ${error.name} - ${error.message}`
        });
        return null;
    }
}
