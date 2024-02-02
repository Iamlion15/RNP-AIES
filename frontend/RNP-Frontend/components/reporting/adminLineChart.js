import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const LineChart = ({statspermonth}) => {
    console.log(statspermonth);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#ff6c00");
    gradientStroke.addColorStop(1, "#ff3b74");

    var gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
    gradientBkgrd.addColorStop(0, "rgba(244,94,132,0.2)");
    gradientBkgrd.addColorStop(1, "rgba(249,135,94,0)");

    const data = {
      labels: ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        backgroundColor: gradientBkgrd,
        borderColor: gradientStroke,
        data: [0]+statspermonth,
        fill: true,
        pointBorderColor: "rgba(255,255,255,0)",
        pointBackgroundColor: "rgba(255,255,255,0)",
        pointBorderWidth: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 4,
        pointRadius: 1,
        borderWidth: 5,
        pointHitRadius: 16,
      }]
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      tooltips: {
        backgroundColor: '#fff',
        displayColors: false,
        titleFontColor: '#000',
        bodyFontColor: '#000',
      },
      legend: {
        display: false,
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: true
          }
        }
      },
      elements: {
        line: {
          tension: 0.4, // Set tension to make the line curve
        },
      },
    };
    chartRef.current.chart=new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }, [statspermonth]);

  return (
    <div style={{ width: '105%', margin: 'auto' }}>
      <canvas ref={chartRef} height={120}></canvas>
    </div>
  );
};

export default LineChart;