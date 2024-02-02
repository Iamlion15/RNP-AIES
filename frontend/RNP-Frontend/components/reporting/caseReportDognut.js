import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CaseDoughnutChart = ({ statspercase }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    //const completionPercentage = statsdata.completed; // Assuming 'completed' is a percentage value (0-100)

    const data = {
      labels: ['Completed', 'Remaining'],
      datasets: [{
        data: [statspercase, 100 -statspercase],
        backgroundColor: ['#92C348', '#E6E6E6'], // Green for completed, Gray for remaining
        hoverBackgroundColor: ['#92C348', '#E6E6E6'],
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
  }, [statspercase]);

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
    <div style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
      <p className="font-gt-america" style={{ margin: 0,fontWeight: "bold", fontSize: "1.5em" }}>{statspercase} %</p>
      <p style={{ fontWeight: "bold", fontSize: "1.9em", margin: 0 }}>Progress</p>
    </div>
    <canvas ref={chartRef}></canvas>
  </div>
  );
};

export default CaseDoughnutChart;
