document.getElementById('training-button').addEventListener('click', () => {
    startTrainingGame();
});

function startTrainingGame() {
    (function() {
        const sounds = [
            '../asset/sounds/gun-sound-1.mp3',
            '../asset/sounds/gun-sound-2.mp3',
            '../asset/sounds/gun-sound-3.mp3',
            '../asset/sounds/gun-sound-4.mp3',
            '../asset/sounds/gun-sound-5.mp3',
            '../asset/sounds/gun-sound-6.mp3',
            '../asset/sounds/gun-sound-7.mp3',
            '../asset/sounds/gun-sound-8.mp3',
        ];

        const playGunSound = (() => {
            let soundIndex = 0;
            return function() {
                const gunSound = new Audio(sounds[soundIndex]);
                gunSound.currentTime = 0;
                gunSound.play();
                soundIndex = (soundIndex + 1) % sounds.length;
            };
        })();

        const elements = {
            body: document.body,
            startMenu: document.getElementById('start-menu'),
            trainingScreen: document.getElementById('training-screen'),
            trainingBackButton: document.getElementById('training-back-button'),
            readyButton: document.getElementById('ready-training-button'),
            redDot: document.getElementById('red-dot-training'),
            counterDisplay: document.getElementById('counter-training'),
            readySetGoText: document.getElementById('ready-set-go-training'),
            playerShooter: document.getElementById('player-shooter-training'),
            trainingArea: document.getElementById('training-area')
        };

        const state = {
            hits: 0,
            dotSize: 60,
            timeLimit: 15000,
            activeTimer: null
        };

        elements.trainingBackButton.addEventListener('click', handleBackButton);
        elements.redDot.addEventListener('click', handleDotClick);
        elements.readyButton.addEventListener('click', handleReadyButton);

        startGame();

        function startGame() {
            elements.body.classList.add('hidden-background');
            elements.startMenu.style.display = 'none';
            elements.trainingScreen.style.display = 'block';
        }

        function handleBackButton() {
            elements.body.classList.remove('hidden-background');
            elements.startMenu.style.display = 'flex';
            elements.trainingScreen.style.display = 'none';
            resetGame();
        }

        function handleDotClick() {
            if (elements.redDot.style.display === 'block') {
                playGunSound();
                changePlayerImage();
                clearTimeout(state.activeTimer);
                state.hits++;
                elements.counterDisplay.innerText = `Hits: ${state.hits}`;
                state.dotSize *= 0.95;
                state.timeLimit *= 0.9;
                spawnRedDot();
            }
        }

        function handleReadyButton() {
            elements.readyButton.style.display = 'none';
            showReadySetGo();
        }

        function showReadySetGo() {
            elements.readySetGoText.innerText = 'Ready';
            setTimeout(() => {
                elements.readySetGoText.innerText = 'Set';
                setTimeout(() => {
                    elements.readySetGoText.innerText = 'Go';
                    setTimeout(startTraining, 1000);
                }, 2000);
            }, 2000);
        }

        function startTraining() {
            elements.readySetGoText.innerText = '';
            spawnRedDot();
        }

        function changePlayerImage() {
            elements.playerShooter.src = 'asset/cowboys/cowboy1backshot.png';
        }

        function spawnRedDot() {
            elements.redDot.style.display = 'block';
            elements.redDot.style.width = `${state.dotSize}px`;
            elements.redDot.style.height = `${state.dotSize}px`;

            const maxX = elements.trainingArea.clientWidth - state.dotSize;
            const maxY = elements.trainingArea.clientHeight - state.dotSize;

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            elements.redDot.style.left = `${randomX}px`;
            elements.redDot.style.top = `${randomY}px`;

            state.activeTimer = setTimeout(() => {
                alert('You failed!');
                resetGame();
            }, state.timeLimit);
        }

        function resetGame() {
            state.hits = 0;
            state.dotSize = 60;
            state.timeLimit = 15000;
            elements.redDot.style.display = 'none';
            elements.counterDisplay.innerText = 'Hits: 0';
            elements.readyButton.style.display = 'block';
            elements.readySetGoText.innerText = '';
            clearTimeout(state.activeTimer);
            state.activeTimer = null;
        }
    })();
}