import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#ff6c00");
    gradientStroke.addColorStop(1, "#ff3b74");

    var gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
    gradientBkgrd.addColorStop(0, "rgba(244,94,132,0.2)");
    gradientBkgrd.addColorStop(1, "rgba(249,135,94,0)");

    const data = {
      labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
      datasets: [{
        backgroundColor: gradientBkgrd,
        borderColor: gradientStroke,
        data: [5500, 2500, 10000, 6000, 14000, 1500, 7000, 20000],
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
            }
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
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                callback: function (value, index, values) {
                  return (value / 1000) + 'K';
                },
              },
            },
          ],
        },
        elements: {
          line: {
            tension: 0.4, // Set tension to make the line curve
          },
        },
      };
      

    new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }, []);

  return (
    <div style={{ width: '105%', margin: 'auto' }}>
      <canvas ref={chartRef} height={200}></canvas>
    </div>
  );
};

export default LineChart;