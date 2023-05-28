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
            const newZip = zipCodeInput.value;
            HANDLERS.appendZipCodeToLocationList(newZip);
            zipCodeInput.value = ''
        }
    })
    
    const form = document.getElementById("form-button")
    form.addEventListener("click", (event) => {
        const zipCodeArr = HANDLERS.getArrayOfZipCodes();
        console.log(zipCodeArr);
        const options = HANDLERS.getInputs();
        HANDLERS.loadWeatherCharts(zipCodeArr, options, canvasObj, event)
    });
})