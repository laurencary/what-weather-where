import { DATA } from "./dataManipulation"
import Chart from 'chart.js/auto'
import { slotMachine } from "./slotMachine";
export * as HANDLERS from "./handlers";

export const addZipCode = (zipCodeInput) => {
    const newZip = zipCodeInput.value;
    const checksArr = [];
    checksArr.push(newZip.length !== 5);
    var reg = new RegExp('^[0-9]+$');
    checksArr.push(!reg.test(newZip));
    if (checksArr.some(e => e === true)) {
        window.alert(`${newZip} is not a valid zip code`);
    } else {
        appendZipCodeToLocationList(newZip);
    }
    zipCodeInput.value = ''
}


export const appendZipCodeToLocationList = (newZip) => {
    const zipList = document.getElementById("location-list");
    const liEls = document.getElementsByClassName("zip-container");
    if (liEls.length < 4) {
        const li = document.createElement("li");
        li.innerText = newZip;
        const btn = document.createElement("button");
        btn.innerText = 'Delete';
        btn.classList.add("delete-button");
        li.appendChild(btn);
        li.classList.add('zip-container');
        zipList.appendChild(li);
        
        const deleteBtns = document.getElementsByClassName("delete-button");
        for (const item of deleteBtns) {
            item.addEventListener("click", e => {
                e.target.parentNode.remove();
            });
        }
    } else {
        window.alert("You can only view up to four locations at a time.")
    }
}

export const getArrayOfZipCodes = () => {
    const liZips = document.querySelectorAll('.zip-container');
    const zipArr = Array.from(liZips).map(liZip => { return liZip.innerText.slice(0, 6) });
    return zipArr;
}

export const getInputs = () => {
    const options = {};
    const xStepInput = document.querySelector("#x-step")
    options.xStep = xStepInput.value;
    const startDateInput = document.getElementById("start-date-input");
    options.startDate = startDateInput.value;
    const endDateInput = document.getElementById("end-date-input");
    options.endDate = endDateInput.value;
    const imperialInput = document.getElementById("imperial-input");
    console.log(imperialInput);
    options.imperialInd = imperialInput.checked;
    return options;
}

export async function loadWeatherCharts(zipCodeArr, options, canvasObj) {
    const chartContainer = document.getElementById("chart-container");

    if (!chartContainer.classList.contains("hidden")) {
        chartContainer.classList.add("hidden");
    }
    
    canvasObj.temp.chart.destroy()
    canvasObj.precip.chart.destroy()
    canvasObj.sun.chart.destroy()
    canvasObj.daylight.chart.destroy()
    
    const data = await DATA.getAllWeatherMetrics(options, zipCodeArr);

    canvasObj.temp.datasets = DATA.createTempChartData(data);
    canvasObj.precip.datasets = DATA.createPrecipChartData(data);
    canvasObj.sun.datasets = DATA.createSunChartData(data);
    canvasObj.daylight.datasets = DATA.createDaylightChartData(data);

    const precipYScaleObj = DATA.getPrecipYObj(canvasObj.precip.datasets);

    // tempChart
    canvasObj.temp.chart = new Chart(
        canvasObj.temp.canvas,
        {
            type: 'line',
            data: {
                labels: data[0]["weather"]["time"],
                datasets: canvasObj.temp.datasets
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
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
                    y: precipYScaleObj
                },
                plugins: {
                    legend: {
                        display: false
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
                        ticks: {
                            stepSize: 4,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
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
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }
    );

    chartContainer.classList.remove("hidden");
};
