const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: lables,
        datasets: [{
            label: 'Temperature in °C',
            data: graphdata,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});