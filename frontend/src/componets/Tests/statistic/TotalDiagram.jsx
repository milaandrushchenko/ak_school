import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import {countResultsByLevel} from "../../../utils/statistics.js";

export default function TotalDiagram({ results }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!results || results.length === 0) {
            return;
        }

        const chart = echarts.init(chartRef.current);

        const testResults = countResultsByLevel(results);

        const data = {
            labels: testResults.map((result) => result.level),
            datasets: [
                {
                    name: 'Кількість проходжень',
                    data: testResults.map((result) => result.count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            // title: {
            //     text: 'Загальна статистика',
            //     left: 'center',
            //     textStyle: {
            //         color: '#1a237e', // Додавання кольору до заголовка
            //     },
            // },
            legend: {
                data: ['Кількість проходжень'],
                left: '10%',
            },
            tooltip: {
                position: window.innerWidth < 768 ? ['0%', '50%'] : null, // Встановлюємо положення підказки лише на малих екранах

            },
            grid: {
                left: '10%',
                top: '30%',
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    label: {
                        show: true,
                        formatter: '{b}: {c}',
                    },
                    data: data.datasets[0].data.map((value, index) => ({
                        name: data.labels[index],
                        value: value,
                    })),
                },
            ],
        };

        chart.setOption(options);

        return () => {
            chart.dispose();
        };
    }, [results]);

    return <div ref={chartRef} style={{ height: '500px', }} />;
}
