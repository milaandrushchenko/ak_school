import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const currentDate = dayjs();

export default function StartTest({testItem, startTest, showStart}) {
    const [access, setAccess] = useState({access: true, notification: ""});
    const {tests, isLoading, visibleData} = useSelector((state) => state.tests);

    // const [isObjectInArray, setIsObjectInArray] = useState(false);

    const testAvailability = (isObjectInArray) => {
        if (!isObjectInArray) {
            setAccess({
                access: false,
                notification: "Немає доступу",
            });
            console.log(tests);
            console.log(testItem);
            console.log(isObjectInArray);
            return;
        }
        if (testItem.is_active !== 1) {
            setAccess({
                access: false,
                notification: "Тест неактивний",
            });
            console.log("неактивний");
        }
        if (currentDate > dayjs(testItem.end_time)) {
            setAccess({
                access: false,
                notification: "Тест закрився",
            });
            console.log("дата завершення пройшла");
        }
        if (
            testItem.results.length > 0 &&
            testItem.results.length >= testItem.max_attempts
        ) {
            setAccess({
                access: false,
                notification: "У Вас більше немає спроб",
            });
            console.log("У Вас більше немає спроб");
        }
    };


    useEffect(() => {
        if (tests.length>0) {
            testAvailability(tests.some((obj) => obj.id === testItem.id));
        }
    }, [testItem, tests]);

    return (
        <>
            {showStart && (
                <>
                    <Typography variant="h4" sx={{marginBottom: "24px"}}>
                        {testItem.title}
                    </Typography>

                    <Typography variant="subtitle1" sx={{marginBottom: "16px"}}>
                        Кількість дозволених спроб:{" "}
                        {testItem.max_attempts !== 0
                            ? testItem.max_attempts
                            : "необмежена кількість"}
                    </Typography>

                    {testItem.time_limit && (
                        <Typography variant="subtitle1" sx={{marginBottom: "16px"}}>
                            Обмеження в часі: {testItem.time_limit} хв
                        </Typography>
                    )}
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
            )}
        </>
    );
}
