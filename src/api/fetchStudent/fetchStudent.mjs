import {ref, get, equalTo, orderByChild, query} from "firebase/database";
import { database } from '../firebase/config.mjs';
import {fetchStudentAdapter} from "./adapters/adapters.mjs";

export const fetchStudent = async (id) => {
    if(!id || typeof id !== 'string') {
        logger.log({
            level: 'info',
            message: `fetchStudent: no student id given.`
        });
        return null;
    }

    try {

    const dataRef = ref(database, 'students');
    const dataQuery = query(dataRef, orderByChild('studentId'), equalTo(id));
        const snapshot = await get(dataQuery);
        if (snapshot.exists()) {
            return fetchStudentAdapter(snapshot.val()) || null;
        } else {
            logger.log({
                level: 'info',
                message: `fetchStudent: No snapshot found for the given field and value.`
            });
            return null;
        }
    } catch (e) {
        logger.log({
            level: 'error',
            message: `fetchStudent: ${e.name} - ${e.message}`
        });
        return null;
    }
};
