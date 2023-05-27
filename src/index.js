import { DATA } from "./scripts/dataManipulation"
import Chart from 'chart.js/auto'

document.addEventListener("DOMContentLoaded", () => {
    const tempCanvas = document.getElementById('temp-chart');
    let tempChart = new Chart (tempCanvas);
    const percipCanvas = document.getElementById('percipitation-chart');
    const sunCanvas = document.getElementById('sun-chart');
    const daylightCanvas = document.getElementById('daylight-chart');
    
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
        // percipChart.clear()
        // sunChart.clear()
        // daylightChart.clear()
        console.log('loading charts');
        const data = await DATA.getAllWeatherMetrics(options, zipCodeInputs);
        const info = document.getElementById("info")
        // const location = `Viewing weather for ${data["meta"]["name"]}, ${data["meta"]["admin1"]} (${options.zipCode})`
        // info.innerText = location;

        const tempChartDataset = DATA.createTempChartData(data);

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
        // new Chart(
        //     percipCanvas,
        //     {
        //         type: 'bar',
        //         data: {
        //             labels: data["weather"]["time"],
        //             datasets: [
        //                 {
        //                     label: 'rain',
        //                     data: data["weather"]["rain_sum"]
        //                 },
        //                 {
        //                     label: 'snow',
        //                     data: data["weather"]["snowfall_sum"]
        //                 }
        //             ]
        //         },
        //         options: {
        //             scales: {
        //                 x: {
        //                     stacked: true
        //                 },
        //                 y: {
        //                     stacked: true,
        //                     type: 'logarithmic'
        //                 }
        //             }
        //         }
            
        //     }
        // );
        // new Chart(
        //     sunCanvas,
        //     {
        //         type: 'line',
        //         data: {
        //             labels: data["weather"]["time"],
        //             datasets: [
        //                 {
        //                     label: 'sunrise',
        //                     data: data["weather"]["sunrise"]
        //                 },
        //                 {
        //                     label: 'sunset',
        //                     data: data["weather"]["sunset"]
        //                 }
        //             ]
        //         }
        //     }
        // );
        // new Chart(
        //     daylightCanvas,
        //     {
        //         type: 'bar',
        //         data: {
        //             labels: data["weather"]["time"],
        //             datasets: [
        //                 {
        //                     label: 'daylight',
        //                     data: data["weather"]["daylight"]
        //                 }
        //             ]
        //         }
        //     }
        // );
    };
})