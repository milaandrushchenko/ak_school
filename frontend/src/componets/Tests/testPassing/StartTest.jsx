import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";

export default function StartTest({test, startTest, showStart}) {


    return (
        <>
            {showStart && (
                <>
                    <Typography variant="h4" sx={{marginBottom: "24px"}}>
                        {test.title}
                    </Typography>

                    <Typography variant="subtitle1" sx={{marginBottom: "16px"}}>
                        Кількість дозволених
                        спроб: {test.max_attempts !== 0 ? test.max_attempts : 'необмежена кількість'}
                    </Typography>


                    {test.time_limit && (
                        <Typography variant="subtitle1" sx={{marginBottom: "16px"}}>
                            Обмеження в часі : {test.time_limit} хв
                        </Typography>)
                    }
                    <Button variant="contained" color="primary" onClick={startTest}>
                        Розпочати тестування
                    </Button>
                </>
            )
            }
        </>
    )
}