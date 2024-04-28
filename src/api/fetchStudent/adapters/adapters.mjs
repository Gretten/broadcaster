export const fetchStudentAdapter = (studentData) => {
    try {
        return Object.entries(studentData).map((el) => {
            const id = el[0];
            const otherInfo = el[1];
            if (otherInfo) {
                const isActive = otherInfo.isActive || null;
                const name = otherInfo.name;

                if(!id || !name) {
                    return null;
                }

                return ({
                    isActive,
                    name,
                    studentId: id
                })
            }
            logger.log({
                level: 'error',
                message: `fetchStudentAdapter: no student info added`
            });
            return null;
        }).filter(el => el);
    } catch (e) {
        logger.log({
            level: 'error',
            message: `fetchStudentAdapter: ${e.name} - ${e.message}`
        });
        return null;
    }
}
