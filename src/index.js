import { HANDLERS } from "./scripts/handlers"
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

    const canvasObj = {
        temp: {canvas: tempCanvas, chart: tempChart, datasets: []},
        precip: { canvas: precipCanvas, chart: precipChart, datasets: [] },
        sun: { canvas: sunCanvas, chart: sunChart, datasets: [] },
        daylight: { canvas: daylightCanvas, chart: daylightChart, datasets: [] }
    };

    
    const zipCodeInput = document.querySelector(".zip-code-input");
    zipCodeInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            HANDLERS.addZipCode(zipCodeInput);
        }
    })
    
    const addZipButton = document.getElementById('add-zip');
    addZipButton.addEventListener('click', (event) => {
        HANDLERS.addZipCode(zipCodeInput);
    })

    const form = document.getElementById("form-button")
    form.addEventListener("click", (event) => {
        event.preventDefault();
        const zipCodeArr = HANDLERS.getArrayOfZipCodes();
        const options = HANDLERS.getInputs();
        if (options.startDate > options.endDate) {
            window.alert("Start date must be before end date.")
        } else if (zipCodeArr.length === 0) {
            window.alert("Please enter at least one zip code.")
        } else {
            HANDLERS.loadWeatherCharts(zipCodeArr, options, canvasObj, event)
            // call slot machine
        }
    });


})