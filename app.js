let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapsContainer.innerHTML = ''; // Clear laps
    lapCount = 0; // Reset lap count
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        lapCount++;
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        
        const lapNumber = document.createElement('span');
        lapNumber.className = 'lap-number';
        lapNumber.textContent = `Lap ${lapCount}`;
        
        const lapTimeElement = document.createElement('span');
        lapTimeElement.className = 'lap-time';
        lapTimeElement.textContent = lapTime;
        
        lapElement.appendChild(lapNumber);
        lapElement.appendChild(lapTimeElement);
        lapsContainer.appendChild(lapElement);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return String(unit).padStart(2, '0');
}
