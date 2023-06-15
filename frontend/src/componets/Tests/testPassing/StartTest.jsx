import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import dayjs from "dayjs";
import {useEffect, useState} from "react";

const currentDate = dayjs();

export default function StartTest({test, startTest, showStart}) {
    const [access, setAccess] = useState({access: true, notification: ''});
    const testAvailability = () => {
        if (test.is_active !== 1) {
            setAccess({
                access: false,
                notification: 'Тест неактивний'
            });
            console.log('неактивний')
        }
        if (currentDate > dayjs(test.end_time)) {
            setAccess({
                access: false,
                notification: 'Тест закрився'
            });
            console.log('дата завершення пройшла')
        }
        if (test.results.length >= test.max_attempts) {
            setAccess({
                access: false,
                notification: 'У Вас більше немає спроб'
            });
            console.log('У Вас більше немає спроб')
        }
    }

    useEffect(() => {
        testAvailability();
    }, [test]);

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
                    {access.access && (
                        <Button variant="contained" color="primary" onClick={startTest}>
                            Розпочати тестування
                        </Button>
                    )}
                    {!access.access && (
                        <Typography variant="subtitle1" sx={{marginBottom: "16px"}}>
                            {access.notification}
                        </Typography>
                    )}
                </>
            )
            }
        </>
    )
}