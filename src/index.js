import { DATA } from "./scripts/data"
import Chart from 'chart.js/auto'

document.addEventListener("DOMContentLoaded", () => {
    const options = {
        zipCode: "94301",
        startDate: "2023-05-06",
        endDate: "2023-05-20"
    };

    
    (async function () {
        const data = await DATA.getWeatherData(options);


        new Chart(
            document.getElementById('temp-chart'),
            {
                type: 'line',
                data: {
                    labels: data["weather"]["daily"]["time"],
                    datasets: [
                        {
                            label: 'Min',
                            // backgroundColor: "white",
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
            document.getElementById('daylight-chart'),
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
    })();
})