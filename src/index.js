import { DATA } from "./scripts/dataManipulation"
import Chart from 'chart.js/auto'

document.addEventListener("DOMContentLoaded", () => {
    const options = {
        startDate: "2023-05-01",
        endDate: "2023-05-15",
        imperialInd: true,
    };

    const form = document.getElementById("weather-form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const zipCodeInput = document.querySelector(".zip-code-input");
        options.zipCode = zipCodeInput.value;
        const startDateInput = document.querySelector(".start-date-input");
        options.startDate = startDateInput.value;
        const endDateInput = document.querySelector(".end-date-input");
        options.endDate = endDateInput.value;
        const imperialInput = document.querySelector(".imperial-input");
        options.imperialInd = imperialInput.checked;
        console.log(options.imperialInd)
        loadWeatherCharts(event)
    });
    
    async function loadWeatherCharts () {
        console.log('loading charts');
        const data = await DATA.getWeatherMetrics(options);
        console.log(data["weather"]);
        const info = document.getElementById("info")
        const location = `Viewing weather for ${data["meta"]["name"]}, ${data["meta"]["admin1"]} (${options.zipCode})`
        info.innerText = location;
        new Chart(
            document.getElementById('temp-chart'),
            {
                type: 'line',
                data: {
                    labels: data["weather"]["time"],
                    datasets: [
                        {
                            label: 'Min',
                            // backgroundColor: "#4787b5",
                            showLine: false,
                            pointStyle: false,
                            data: data["weather"]["temperature_2m_min"]
                        },
                        {
                            label: 'Max',
                            fill: '-1',
                            showLine: false,
                            data: data["weather"]["temperature_2m_max"]
                        }
                    ]
                }
            }
        );
        new Chart(
            document.getElementById('percipitation-chart'),
            {
                type: 'bar',
                data: {
                    labels: data["weather"]["time"],
                    datasets: [
                        {
                            label: '(mm)',
                            data: data["weather"]["precipitation_sum"]
                        },
                    ]
                }
            }
        );
        new Chart(
            document.getElementById('sun-chart'),
            {
                type: 'line',
                data: {
                    labels: data["weather"]["time"],
                    datasets: [
                        {
                            label: 'sunrise',
                            data: data["weather"]["sunrise"]
                        },
                        {
                            label: 'sunset',
                            data: data["weather"]["sunset"]
                        }
                    ]
                }
            }
        );
        new Chart(
            document.getElementById('daylight-chart'),
            {
                type: 'bar',
                data: {
                    labels: data["weather"]["time"],
                    datasets: [
                        {
                            label: 'daylight',
                            data: data["weather"]["daylight"]
                        }
                    ]
                }
            }
        );
    };
})