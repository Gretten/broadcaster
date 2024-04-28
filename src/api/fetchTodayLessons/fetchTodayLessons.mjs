import {ref, get, equalTo, orderByChild, query,  } from "firebase/database";
import { database } from '../firebase/index.mjs';
import { lessonsAdapter } from "./adapters/index.mjs";

/**
 * @param currentDay is a string like YYYY MMM DD ("2024 Apr 27")
 * @return adapted lessons data | null
 */
export const fetchTodayLessons = async (currentDay) => {
    try {
        if(!currentDay) {
            logger.log({
                level: 'error',
                message: `getTodayLessons: no current day given in getTodayLessons`,
            });
            return null;
        }
        const dataRef = ref(database, 'lessons');
        const dataQuery = query(dataRef, orderByChild('day'),equalTo(currentDay));

        const snapshot = await get(dataQuery);
        if (snapshot.exists()) {
            return lessonsAdapter(snapshot.val());
        } else {
            logger.log({
                level: 'info',
                message: `getTodayLessons: no snapshot exists.`
            });
            return null;
        }
    } catch (e) {
        logger.log({
            level: 'error',
            message: `getTodayLessons: ${e.name} - ${e.message}`
        });
        return null;
    }

};
