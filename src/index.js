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
        } else if (zipCodeArr.length === 0 && zipCodeInput.value !== '') {
            HANDLERS.addZipCode(zipCodeInput)
            HANDLERS.loadWeatherCharts(zipCodeArr, options, canvasObj, event) 
        } else if (zipCodeArr.length === 0) {
            window.alert("Please enter at least one zip code.")
        } else {
            const welcome = document.getElementById("welcome");
            welcome.classList.add("hidden");
            HANDLERS.loadWeatherCharts(zipCodeArr, options, canvasObj, event)
        }
    });

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const items = [
        '⛈️',
        '🌥️',
        '☔️',
        '🌧️',
        '🌨️',
        '🌪️',
        '🌤️',
        '🌈',
        '❄️',
        '🌦️',
        '☀️',
    ];

    const doors = document.querySelectorAll('.door');

    document.querySelector('#spinner').addEventListener('click', spin);
    document.querySelector('#reseter').addEventListener('click', init);

    function init(firstInit = true, groups = 1, duration = 1) {
        console.log('init');
        for (const door of doors) {
            if (firstInit) {
                door.dataset.spinned = '0';
            } else if (door.dataset.spinned === '1') {
                return;
            }

            const boxes = door.querySelector('.boxes');
            const boxesClone = boxes.cloneNode(false);
            const pool = ['❓'];

            if (!firstInit) {
                const arr = [];
                for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
                    arr.push(...items);
                }
                pool.push(...shuffle(arr));

                boxesClone.addEventListener(
                    'transitionstart',
                    function () {
                        door.dataset.spinned = '1';
                        this.querySelectorAll('.box').forEach((box) => {
                            box.style.filter = 'blur(1px)';
                        });
                    },
                    { once: true }
                );

                boxesClone.addEventListener(
                    'transitionend',
                    function () {
                        this.querySelectorAll('.box').forEach((box, index) => {
                            box.style.filter = 'blur(0)';
                            if (index > 0) this.removeChild(box);
                        });
                    },
                    { once: true }
                );
            }

            for (let i = pool.length - 1; i >= 0; i--) {
                const box = document.createElement('div');
                box.classList.add('box');
                box.style.width = door.clientWidth + 'px';
                box.style.height = door.clientHeight + 'px';
                box.textContent = pool[i];
                boxesClone.appendChild(box);
            }
            boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
            boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
            door.replaceChild(boxesClone, boxes);
        }
    }

    async function spin() {
        init(false, 1, 2);
        console.log('spinning');

        for (const door of doors) {
            const boxes = door.querySelector('.boxes');
            const duration = parseInt(boxes.style.transitionDuration);
            boxes.style.transform = 'translateY(0)';
            await new Promise((resolve) => setTimeout(resolve, duration * 100));
        }
    }

    function shuffle([...arr]) {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    }

    init();


})

