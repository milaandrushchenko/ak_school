import TotalDiagram from "./TotalDiagram.jsx";
import QuestionResultsDiagram from "./QuestionResultsDiagram.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TestStatistic({results, questions}) {
    const resultsQ = [
        {question: 'Питання 1', correctCount: 8, incorrectCount: 2},
        {question: 'Питання 2', correctCount: 6, incorrectCount: 4},
        {question: 'Питання 3', correctCount: 12, incorrectCount: 1},
        // Додайте інші об'єкти питань тут
    ];
    return (
        <>
            <Box textAlign="center" sx={{marginBottom:'-50px'}}>
                <Typography component="h2" variant="h6" color="primary"  gutterBottom sx={{marginBottom:'-60px'}}>
                    Статистика по всім проходженням
                </Typography>
                <TotalDiagram key="total-diagram" results={results}/>
            </Box>
            <Box textAlign="center">
                <Typography component="h2" variant="h6" color="primary"  gutterBottom>
                    Статистика по кожному питанню
                </Typography>
            <QuestionResultsDiagram key="question-results-diagram" questions={questions}
                                    chartId={2}/>
            </Box>
        </>
    )
}