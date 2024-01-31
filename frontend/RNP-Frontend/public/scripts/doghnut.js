const Chart=require("chart.js")
// round corners
	Chart.pluginService.register({
		afterUpdate: function (chart) {
			for	(let i = 1; i < chart.config.data.labels.length; i++){
				var arc = chart.getDatasetMeta(0).data[i];
				arc.round = {
					x: (chart.chartArea.left + chart.chartArea.right) / 2,
					y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
					radius: (chart.outerRadius + chart.innerRadius) / 2,
					thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
					backgroundColor: arc._model.backgroundColor
				}	
			}
			// Draw rounded corners for first item
			var arc = chart.getDatasetMeta(0).data[0];
			arc.round = {
				x: (chart.chartArea.left + chart.chartArea.right) / 2,
				y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
				radius: (chart.outerRadius + chart.innerRadius) / 2,
				thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
				backgroundColor: arc._model.backgroundColor
			}	
		},

		afterDraw: function (chart) {
			for	(let i = 1; i < chart.config.data.labels.length; i++){
				var ctx = chart.chart.ctx; arc = chart.getDatasetMeta(0).data[i];
				var startAngle = Math.PI / 2 - arc._view.startAngle;
				var endAngle = Math.PI / 2 - arc._view.endAngle;
				ctx.save();
				ctx.translate(arc.round.x, arc.round.y);
				ctx.fillStyle = arc.round.backgroundColor;
				ctx.beginPath();
				ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
				ctx.closePath(); ctx.fill(); ctx.restore();
			}
			// Draw rounded corners for first item
			var ctx = chart.chart.ctx; arc = chart.getDatasetMeta(0).data[0];
			var startAngle = Math.PI / 2 - arc._view.startAngle;
			var endAngle = Math.PI / 2 - arc._view.endAngle;
			ctx.save();
			ctx.translate(arc.round.x, arc.round.y);
			ctx.fillStyle = arc.round.backgroundColor;
			ctx.beginPath();
			// ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
			ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
			ctx.closePath(); ctx.fill(); ctx.restore();
		},
	});

	var config = {
		type: 'doughnut',
		data: {
			labels: ['今週', '先週', '先月', '先月以前'],
			datasets: [{
				data: [75, 15, 8, 7, 20],
				backgroundColor: ["#62C1C1","#92C348", "#EC6362", "#B4B4B5", "#BFE5E5" ],
				hoverBackgroundColor: [ "#62C1C1", "#92C348", "#EC6362", "#B4B4B5", "#BFE5E5" ],
				borderWidth: 0,
				borderColor: ["#62C1C1","#92C348", "#EC6362", "#B4B4B5","#BFE5E5" ],
				hoverBorderWidth: 2,
			}]
		},
		options: {
			responsive: true,
			legend: {
				position: 'bottom',
				reverse: true,
				labels: {
					padding: 25,
					fontSize: 12,
					fontColor: 'rgb(0, 0, 0)'
				}
			},
			tooltips: {
				enabled: true,
			},
			cutoutPercentage: 78,
			rotation: -0.5 * Math.PI,
			circumference: 2 * Math.PI,
			title: {
				display: true,
				text: 'Chart.js Doughnut Chart'
			},
			animation: {
				animateScale: true,
				animateRotate: true
			},
			elements: {
				center: {
					// the longest text that could appear in the center  7,500,000 /10,000,000
					maxText: '100%',
					text: '',
					fontColor: '#000',
					fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
					fontStyle: 'bold',
					minFontSize: 1,
					maxFontSize: 256,
				}
			}
		}
	};
window.onload = function() {
	var ctx = document.getElementById('myChart').getContext('2d');
	window.myDoughnut = new Chart(ctx, config);
	// window.myDoughnut.generateLegend();
};
