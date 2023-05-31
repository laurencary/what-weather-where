import { async } from "regenerator-runtime";
export * as slotMachine from './slotMachine'

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


export function init(firstInit = true, groups = 1, duration = 1) {
    const doors = document.querySelectorAll('.door');
    for (const door of doors) {
        if (firstInit) {
            door.dataset.spinned = '0';
        } else if (door.dataset.spinned === '1') {
            return;
        }

        const boxes = document.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const pool = ['❓']

        if (!firstInit) {
            const arr = [];
            for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
                arr.push(...items);
            }
            poolpush(...shuffle(arr));

            boxesClone.addEventListener(
                'transitionstart',
                function() {
                    door.dataset.spinned = '1';
                    this.querySelectorAll('.box').forEach((box) => {
                        box.style.filter = 'blur(1px)';
                    });
                },
                { once: true}
            );

            boxesClone.addEventListener(
                'transitionend',
                function() {
                    this.querySelectorAll('.box').forEach((box, index) => {
                        box.style.filter = 'blur(0)';
                        if (index > 0) this.removeChild(box);
                    });
                },
                { once: true }
            );
        }

        for (let i = pool.length - 1; i >=0 ; i--) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.style.height = door.clientHeight + 'vh'
            box.style.width = door.clientWidth + 'vw'
            box.textContent = pool[i]
            boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}vh)`
        door.replaceChild(boxesClone, boxes);
    }
}

export async function spin() {
    init(false, 1, 2);
    const doors = document.querySelectorAll('.door');

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
        const i = Math.floor(Math.random() * m--)
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
}

export async function slide() {
    console.log('calling slide');
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const box3 = document.getElementById('box3');

    box1.classList.toggle('hide');
    box2.classList.toggle('hide');
    box3.classList.toggle('hide');
} 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}