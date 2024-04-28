export const lessonsAdapter = (lessonsForToday) => {
    if(!lessonsForToday) {
        return null;
    }

    return Object.values(lessonsForToday).map(lesson => {
        const id = lesson.studentId;
        const timestamp = lesson.timestamp;

        if(!id) {
            logger.log({
                level: 'error',
                message: `Lesson with timestamp ${timestamp || ' NO TIMESTAMP '} has no ID`
            });
            return null;
        }

        if(!timestamp) {
            logger.log({
                level: 'error',
                message: `Lesson with id ${id} has no timestamp`
            });
            return null;
        }

        return {
            studentId: lesson.studentId,
            timestamp: Number(lesson.timestamp),
        }
    }).filter(lesson => lesson);
};
