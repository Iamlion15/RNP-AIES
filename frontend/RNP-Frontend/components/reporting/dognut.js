import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: ['pending', 'Answered', 'waiting police decision'],
      datasets: [{
        data: [75, 15, 7],
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
      center: {
        text: 'My Texttttttttt',
        color: 'white',
        fontStyle: 'Arial',
        fontSize: 20 // set font size  
      },
    };

    new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <p style={{ position: 'absolute', bottom: '90px', left: '50%', transform: 'translateX(-50%)',fontWeight:"bold",fontSize:"1.9em" }}>Report</p>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DoughnutChart;
