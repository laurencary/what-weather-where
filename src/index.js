import { DATA } from "./scripts/data"
import Chart from 'chart.js/auto'

document.addEventListener("DOMContentLoaded", () => {
    console.log("its working");

    const options = {
        zipCode: "94301",
        startDate: "2023-05-06",
        endDate: "2023-05-20"
    };

    DATA.getWeatherData(options);

    (async function () {
        const data = [
            { year: 2010, count: 10 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: 25 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: 28 },
        ];

        new Chart(
            document.getElementById('temp-chart'),
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.year),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: data.map(row => row.count)
                        }
                    ]
                }
            }
        );
    })();
    // DATA.getWeatherData(options);
})