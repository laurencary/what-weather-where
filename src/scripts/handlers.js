import { DATA } from "./dataManipulation"
import Chart from 'chart.js/auto'

export * as HANDLERS from "./handlers";

export const appendZipCodeToLocationList = (newZip) => {
    const zipList = document.getElementById("location-list");
    const li = document.createElement("li")
    li.innerText = newZip;
    zipList.appendChild(li);
}

export const getArrayOfZipCodes = () => {
    const liZips = document.querySelectorAll('li');
    const zipArr = Array.from(liZips).map(liZip => {return liZip.innerText});
    return zipArr;
}

export const getInputs = () => {
    const options = {};
    const startDateInput = document.querySelector(".start-date-input");
    options.startDate = startDateInput.value;
    const endDateInput = document.querySelector(".end-date-input");
    options.endDate = endDateInput.value;
    const imperialInput = document.querySelector(".imperial-input");
    options.imperialInd = imperialInput.checked;
    return options;
}

export async function loadWeatherCharts(zipCodeArr, options, canvasObj) {
    canvasObj.temp.chart.destroy()
    canvasObj.precip.chart.destroy()
    canvasObj.sun.chart.destroy()
    canvasObj.daylight.chart.destroy()

    const data = await DATA.getAllWeatherMetrics(options, zipCodeArr);
    canvasObj.temp.datasets = DATA.createTempChartData(data);
    canvasObj.precip.datasets = DATA.createPrecipChartData(data);
    canvasObj.sun.datasets = DATA.createSunChartData(data);
    canvasObj.daylight.datasets = DATA.createDaylightChartData(data);

    // tempChart
    canvasObj.temp.chart = new Chart(
        canvasObj.temp.canvas,
        {
            type: 'line',
            data: {
                labels: data[0]["weather"]["time"],
                datasets: canvasObj.temp.datasets
            },
        }
    );
    //precipChart
    canvasObj.precip.chart = new Chart(
        canvasObj.precip.canvas,
        {
            type: 'bar',
            data: {
                labels: data[0]["weather"]["time"],
                datasets: canvasObj.precip.datasets
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
    //sunChart
    canvasObj.sun.chart = new Chart(
        canvasObj.sun.canvas,
        {
            type: 'line',
            data: {
                labels: data[0]["weather"]["time"],
                datasets: canvasObj.sun.datasets
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
    //daylightCanvas
    canvasObj.daylight.chart = new Chart(
        canvasObj.daylight.canvas,
        {
            type: 'bar',
            data: {
                labels: data[0]["weather"]["time"],
                datasets: canvasObj.daylight.datasets
            }
        }
    );
};