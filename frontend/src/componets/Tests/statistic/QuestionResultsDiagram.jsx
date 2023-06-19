import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';

export default function QuestionResultsDiagram({questions}) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!questions || questions.length === 0) {
            return;
        }

        const chart = echarts.init(chartRef.current);

        const xAxisData = questions.map((question, index) => `Запитання ${index + 1}`);
        const data1 = questions.map((question) => question.correct_count);
        const data2 = questions.map((question) => question.incorrect_count);
        const data3 = questions.map((question) => question.partly_correct_count);

        const options = {
            legend: {
                data: ['Кількість правильних відповідей', 'Кількість неправильних відповідей', 'Кількість частково правильних відповідей'],

            },
            tooltip: {
                position: window.innerWidth < 768 ? ['0%', '50%'] : null, // Встановлюємо положення підказки лише на малих екранах

            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLine: {onZero: true},
                splitLine: {show: false},
                splitArea: {show: false},
            },
            yAxis: {
                type: 'value',
            },
            dataZoom: [
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    filterMode: 'empty',
                    start: 0,
                    end: questions.length,
                },
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty',
                    start: 0,
                    end: questions.length,
                },
            ],
            series: [
                {
                    name: 'Кількість правильних відповідей',
                    type: 'bar',
                    stack: 'stack',
                    data: data1,
                },
                {
                    name: 'Кількість неправильних відповідей',
                    type: 'bar',
                    stack: 'stack',
                    data: data2,
                },
                {
                    name: 'Кількість частково правильних відповідей',
                    type: 'bar',
                    stack: 'stack',
                    data: data3,
                },
            ],
        };

        chart.setOption(options);

        return () => {
            chart.dispose();
        };
    }, [questions]);

    return <div ref={chartRef} style={{height: '400px'}}/>;
}
