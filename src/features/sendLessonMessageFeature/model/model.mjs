import {fetchStudent} from "../../../api/fetchStudent/fetchStudent.mjs";
import {fetchTodayLessons} from "../../../api/fetchTodayLessons/index.mjs";
import {getLessonMessage} from "./constants/lessonMessage.mjs";

export const getStudent = async () => {
    return await fetchStudent() || null;
}

export const getLessons = async (currentDay) => {
    return await fetchTodayLessons(currentDay) || null;
}

export const lessonsMessage = (teacherName) => getLessonMessage(teacherName);
