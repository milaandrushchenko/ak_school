import React, {useEffect, useState} from 'react';
import Countdown, {calcTimeDelta} from 'react-countdown';
import Swal from 'sweetalert2';
import {Chip} from '@mui/material';
import {timeConverter} from "../../../utils/common.js";

export default function CountDown({countdownTime, timeOver, endTime, setEndTime, testStorage}) {


    useEffect(() => {
        const timer = setTimeout(() => {
            setEndTime(0);
        }, countdownTime * 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [countdownTime]);

    const handleComplete = () => {
        Swal.fire({
            title: 'Ваш час вийшов',
            icon: 'info',
            timer: 5000,
            willClose: () => {
                timeOver();

            },
        });
    };

    return (
        <>
            <Countdown
                date={endTime}
                onComplete={handleComplete}
                renderer={({hours, minutes, seconds}) => (
                    <Chip variant="outlined" color="error"
                          label={`${timeConverter(hours)}:${timeConverter(minutes)}:${timeConverter(seconds)}`}/>
                )}
            />
        </>
    );
}
