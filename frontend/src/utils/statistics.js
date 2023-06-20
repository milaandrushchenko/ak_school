export const countResultsByLevel = (results) => {
    return results?.reduce((counts, result) => {
        console.log(result);
        if (result.total_score >= 0 && result.total_score <= 3) {
            console.log(result.total_score);
            counts[0].count++;
        } else if (result.total_score >= 4 && result.total_score <= 6) {
            console.log(result.total_score);
            counts[1].count++;
        } else if (result.total_score >= 7 && result.total_score <= 9) {
            console.log(result.total_score);
            counts[2].count++;
        } else if (result.total_score >= 10 && result.total_score <= 12) {
            console.log(result.total_score);
            counts[3].count++;
        }
        return counts;
    },  [
        { level: 'Початковий рівень', count: 0 },
        { level: 'Середній рівень', count: 0 },
        { level: 'Достатній рівень', count: 0 },
        { level: 'Високий рівень', count: 0 },
    ]);
};


const questionResults = [
    { question: 'Питання 1', correctCount: 8, incorrectCount: 2 },
    { question: 'Питання 2', correctCount: 6, incorrectCount: 4 },
    { question: 'Питання 3', correctCount: 9, incorrectCount: 1 },
    // Додайте інші об'єкти питань тут
];



