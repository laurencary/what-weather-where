import { DATA } from "./scripts/data"
import Chart from 'chart.js/auto'

document.addEventListener("DOMContentLoaded", () => {
    const options = {
        zipCode: "94301",
        startDate: "2023-05-06",
        endDate: "2023-05-20"
    };
    const button = document.getElementById("load-data")
    button.addEventListener("click", () => loadWeatherCharts);

    
    async function loadWeatherCharts () {
        console.log('loading charts');
        const data = await DATA.getWeatherMetrics(options);
        const info = document.getElementById("info")
        const location = `Viewing weather for ${data["meta"]["name"]}, ${data["meta"]["admin1"]} (${options.zipCode})`
        info.innerText = location;
        
        new Chart(
            document.getElementById('temp-chart'),
            {
                type: 'line',
                data: {
                    labels: data["weather"]["daily"]["time"],
                    datasets: [
                        {
                            label: 'Min',
                            // backgroundColor: "#4787b5",
                            data: data["weather"]["daily"]["temperature_2m_min"]
                        },
                        {
                            label: 'Max',
                            fill: '-1',
                            data: data["weather"]["daily"]["temperature_2m_max"]
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
                    labels: data["weather"]["daily"]["time"],
                    datasets: [
                        {
                            label: '(mm)',
                            data: data["weather"]["daily"]["precipitation_sum"]
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
                    labels: data["weather"]["daily"]["time"],
                    datasets: [
                        {
                            label: 'sunrise',
                            data: data["weather"]["daily"]["sunrise"]
                        },
                        {
                            label: 'sunset',
                            data: data["weather"]["daily"]["sunset"]
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
                    labels: data["weather"]["daily"]["time"],
                    datasets: [
                        {
                            label: 'daylight',
                            data: data["weather"]["daily"]["daylight"]
                        }
                    ]
                }
            }
        );
    };
})