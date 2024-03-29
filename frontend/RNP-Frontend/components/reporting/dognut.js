import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({statsdata}) => {
    console.log(statsdata.answered);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
  
    const data = {
      labels: ['pending', 'Answered', 'police reviewed'],
      datasets: [{
        data: [statsdata.notanswered, statsdata.answered, statsdata.complete],
        backgroundColor: ['#62C1C1', '#92C348', '#EC6362', ],
        hoverBackgroundColor: ['#62C1C1', '#92C348', '#EC6362', ],
        borderWidth: 0,
        hoverBorderWidth: 2,
      }],
    };

    const options = {
      responsive: true,
      cutout: '80%',
      rotation: -0.5 * Math.PI,
      circumference: 360,
      title: {
        display: false,
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    };
    chartRef.current.chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options,
      });


  }, [statsdata]);

  return (  
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <p style={{ position: 'absolute', bottom: '90px', left: '50%', transform: 'translateX(-50%)',fontWeight:"bold",fontSize:"1.9em" }}>Report</p>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DoughnutChart;
