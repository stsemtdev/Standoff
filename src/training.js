document.getElementById('training-button').addEventListener('click', () => {
    document.getElementById('start-menu').style.display = 'none';
    document.getElementById('training-screen').style.display = 'block';
});

document.getElementById("training-back-button").addEventListener('click', () => {
    document.getElementById('start-menu').style.display = 'flex';
    document.getElementById('training-screen').style.display = 'none';
});

const readyButton = document.getElementById('ready-training-button');
const redDot = document.getElementById('red-dot-training');
const counterDisplay = document.getElementById('counter-training');
const readySetGoText = document.getElementById('ready-set-go-training');
let hits = 0;
let dotSize = 30; // Initial size of the red dot
let timeLimit = 10000; // Initial time limit in milliseconds

readyButton.addEventListener('click', () => {
    readyButton.style.display = 'none';
    readySetGoText.innerText = 'Ready... Set... Go!';
    setTimeout(startTraining, 2000); // Delay to show "Ready, Set, Go!"
});

function startTraining() {
    readySetGoText.innerText = '';
    spawnRedDot();
}

function spawnRedDot() {
    redDot.style.display = 'block';
    redDot.style.width = `${dotSize}px`;
    redDot.style.height = `${dotSize}px`;

    const trainingArea = document.getElementById('training-area');
    const maxX = trainingArea.clientWidth - dotSize;
    const maxY = trainingArea.clientHeight - dotSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    redDot.style.left = `${randomX}px`;
    redDot.style.top = `${randomY}px`;

    const timer = setTimeout(() => {
        alert('You failed!');
        resetTraining();
    }, timeLimit);

    redDot.addEventListener('click', () => {
        clearTimeout(timer);
        hits++;
        counterDisplay.innerText = `Hits: ${hits}`;
        dotSize *= 0.9; // Reduce dot size
        timeLimit *= 0.9; // Reduce time limit
        spawnRedDot();
    }, { once: true });
}

function resetTraining() {
    hits = 0;
    dotSize = 30;
    timeLimit = 10000;
    redDot.style.display = 'none';
    counterDisplay.innerText = 'Hits: 0';
    readyButton.style.display = 'block';
    readySetGoText.innerText = '';
}

  