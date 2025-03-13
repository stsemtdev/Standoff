document.getElementById('campaign-button').addEventListener('click', () => {
    startGame();
});

function startGame() {
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

        const playAmbianceSound = () => {
            const ambianceSound = new Audio('../asset/sounds/ambiance.mp3')
            ambianceSound.volume = 0.1;
            ambianceSound.play();
        };
        
        playAmbianceSound();
        
        const elements = {
            body: document.body,
            startMenu: document.getElementById('start-menu'),
            campaignScreen: document.getElementById('campaign-screen'),
            campaignBackButton: document.getElementById('campaign-back-button'),
            readyButton: document.getElementById('ready-campaign-button'),
            redDot: document.getElementById('red-dot-campaign'),
            readySetGoText: document.getElementById('ready-set-go-campaign'),
            playerShooter: document.getElementById('campaign-player-shooter'),
            opponentShooter: document.getElementById('campaign-opponent-shooter')
        };

        let timeouts = [];
        let outsideClickHandler = null;
        let isGameActive = true;

        elements.campaignBackButton.addEventListener('click', handleBackButton);
        elements.readyButton.addEventListener('click', handleReadyButton);

        elements.body.classList.add('hidden-background');
        elements.startMenu.style.display = 'none';
        elements.campaignScreen.style.display = 'block';

        function handleBackButton() {
            isGameActive = false;
            cleanupEvents();
            elements.body.classList.remove('hidden-background');
            elements.startMenu.style.display = 'flex';
            elements.campaignScreen.style.display = 'none';
            resetGame();
        }

        function showRedDot() {
            const margin = 100;
            const randomX = Math.floor(Math.random() * (window.innerWidth / 2 - margin * 2)) + window.innerWidth / 4 + margin;
            const randomY = Math.floor(Math.random() * (window.innerHeight / 2 - margin * 2)) + window.innerHeight / 4 + margin;

            elements.redDot.style.left = `${randomX}px`;
            elements.redDot.style.top = `${randomY}px`;
            elements.redDot.style.display = 'block';

            timeouts.push(setTimeout(() => {
                if (!isGameActive) return;
                changeOpponentImage();
                playGunSound();
                timeouts.push(setTimeout(() => {
                    if (!isGameActive) return;
                    alert('You lose!');
                    resetGame();
                }, 500));
            }, 3000));

            elements.redDot.addEventListener('click', handleRedDotClick, { once: true });
        }

        function handleRedDotClick() {
            elements.redDot.style.display = 'none'
            cleanupTimeouts();
            if (!isGameActive) return;
            changePlayerImage();
            playGunSound();
            animateCowboy2(() => {
                if (!isGameActive) return;
                alert('You win!');
                resetGame();
            });
        }

        function showReadySetGo() {
            elements.readySetGoText.textContent = 'Ready';
            timeouts.push(setTimeout(() => {
                elements.readySetGoText.textContent = 'Set';
                const randomDelay = (Math.floor(Math.random() * 12) + 3) * 1000;
                timeouts.push(setTimeout(() => {
                    if (!isGameActive) return;
                    elements.readySetGoText.textContent = 'Go';
                    showRedDot();
                    enableClickDetection();
                }, randomDelay));
            }, 1000));
        }

        function handleReadyButton() {
            elements.readyButton.style.display = 'none';
            showReadySetGo();
        }

        function enableClickDetection() {
            outsideClickHandler = detectOutsideClick;
            document.addEventListener('click', outsideClickHandler, { once: true });
        }

        function detectOutsideClick(event) {
            if (!elements.redDot.contains(event.target)) {
                changeOpponentImage();
                timeouts.push(setTimeout(() => {
                    if (!isGameActive) return;
                    alert('You lose!');
                    resetGame();
                }, 3000));
            }
        }

        function changePlayerImage() {
            elements.playerShooter.src = 'asset/cowboys/cowboy1backshot.png';
        }

        function changeOpponentImage() {
            elements.opponentShooter.src = 'asset/cowboys/cowboy2shot.png';
        }

        function animateCowboy2(callback) {
            const images = [
                'asset/cowboys/cowboy2gotshot.png',
                'asset/cowboys/cowboy2gotshot2.png',
                'asset/cowboys/cowboy2gotshot3.png'
            ];

            images.forEach((image, index) => {
                const timeout = setTimeout(() => {
                    elements.opponentShooter.src = image;
                    if (index === images.length - 1 && callback && isGameActive) {
                        timeouts.push(setTimeout(callback, 1000));
                    }
                }, index * 1000);
                timeouts.push(timeout);
            });
        }

        function resetGame() {
            cleanupEvents();
            elements.readySetGoText.textContent = '';
            elements.redDot.style.display = 'none';
            elements.opponentShooter.src = 'asset/cowboys/cowboy2.png';
            elements.playerShooter.src = 'asset/cowboys/cowboy1back.png';
            elements.readyButton.style.display = 'block';
            isGameActive = true;
        }

        function cleanupEvents() {
            cleanupTimeouts();
            if (outsideClickHandler) {
                document.removeEventListener('click', outsideClickHandler);
                outsideClickHandler = null;
            }
            elements.redDot.removeEventListener('click', handleRedDotClick);
        }

        function cleanupTimeouts() {
            timeouts.forEach(timeout => clearTimeout(timeout));
            timeouts = [];
        }
    })();
}