import React from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// Використовуємо необхідні компоненти та рендерери
echarts.use([BarChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export default function QuestionResultsDiagram() {
    const questionResults = [
        { question: 'Питання 1', correctCount: 8, incorrectCount: 2 },
        { question: 'Питання 2', correctCount: 6, incorrectCount: 4 },
        { question: 'Питання 3', correctCount: 9, incorrectCount: 1 },
        // Додайте інші об'єкти питань тут
    ];

    const data = {
        labels: questionResults.map((question) => question.question),
        datasets: [
            {
                label: 'Кількість правильних відповідей',
                data: questionResults.map((question) => question.correctCount),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: 'Кількість неправильних відповідей',
                data: questionResults.map((question) => question.incorrectCount),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Результати учнів за кожним питанням',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                max: 10,
            },
        },
    };

    React.useEffect(() => {
        const chartElement = document.getElementById('question-results-chart');
        const chart = echarts.init(chartElement);
        const option = {
            xAxis: {
                type: 'category',
                data: data.labels,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: 'Кількість правильних відповідей',
                    type: 'bar',
                    data: data.datasets[0].data,
                    itemStyle: {
                        color: data.datasets[0].backgroundColor,
                    },
                },
                {
                    name: 'Кількість неправильних відповідей',
                    type: 'bar',
                    data: data.datasets[1].data,
                    itemStyle: {
                        color: data.datasets[1].backgroundColor,
                    },
                },
            ],
        };
        chart.setOption(option);
    }, []);

    return (
        <>
            <div id="question-results-chart" style={{ width: '100%', height: '400px' }}></div>
        </>
    );
}
