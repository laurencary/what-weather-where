import { DATA } from "./scripts/dataManipulation"
import Chart from 'chart.js/auto'

document.addEventListener("DOMContentLoaded", () => {
    const tempCanvas = document.getElementById('temp-chart');
    let tempChart = new Chart (tempCanvas);
    const precipCanvas = document.getElementById('precipitation-chart');
    let precipChart = new Chart (precipCanvas);
    const sunCanvas = document.getElementById('sun-chart');
    let sunChart = new Chart(sunCanvas);
    const daylightCanvas = document.getElementById('daylight-chart');
    let daylightChart = new Chart(daylightCanvas);
    
    const zipCodeInputs = ['94301', '53704']
    const options = {}
    const form = document.getElementById("weather-form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // const zipCodeInput = document.querySelector(".zip-code-input");
        // options.zipCode = zipCodeInput.value;
        const startDateInput = document.querySelector(".start-date-input");
        options.startDate = startDateInput.value;
        const endDateInput = document.querySelector(".end-date-input");
        options.endDate = endDateInput.value;
        const imperialInput = document.querySelector(".imperial-input");
        options.imperialInd = imperialInput.checked;
        loadWeatherCharts(event)
    });

    async function loadWeatherCharts () {
        tempChart.destroy()
        precipChart.destroy()
        sunChart.destroy()
        daylightChart.destroy()

        const data = await DATA.getAllWeatherMetrics(options, zipCodeInputs);
        // const info = document.getElementById("info")
        // const location = `Viewing weather for ${data["meta"]["name"]}, ${data["meta"]["admin1"]} (${options.zipCode})`
        // info.innerText = location;

        const tempChartDataset = DATA.createTempChartData(data);
        const precipChartDataset = DATA.createPrecipChartData(data);
        const sunChartDataset = DATA.createSunChartData(data);
        const daylightChartDataset = DATA.createDaylightChartData(data);

        tempChart = new Chart(
            tempCanvas,
            {
                type: 'line',
                data: {
                    labels: data[0]["weather"]["time"],
                    datasets: tempChartDataset
                },
            }
        );
        precipChart = new Chart(
            precipCanvas,
            {
                type: 'bar',
                data: {
                    labels: data[0]["weather"]["time"],
                    datasets: precipChartDataset
                },
                options: {
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true,
                            type: 'logarithmic'
                        }
                    }
                }

            }
        );
        sunChart = new Chart(
            sunCanvas,
            {
                type: 'line',
                data: {
                    labels: data[0]["weather"]["time"],
                    datasets: sunChartDataset
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            reverse: true,
                            max: 24,
                            min: 0,
                            stepValue: 4
                        }    
                    }
                }
            }
        );
        daylightChart = new Chart(
            daylightCanvas,
            {
                type: 'bar',
                data: {
                    labels: data[0]["weather"]["time"],
                    datasets: daylightChartDataset
                }
            }
        );
    };
})