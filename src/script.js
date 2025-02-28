document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('ready-button').addEventListener('click', showReadySetGo);

function startGame() {
    document.getElementById('start-menu').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
}

function showReadySetGo() {
    const readySetGo = document.getElementById('ready-set-go');
    readySetGo.textContent = 'Ready';
    setTimeout(() => {
        readySetGo.textContent = 'Set';
        const randomDelay = (Math.floor(Math.random() * (12)) + 3) * 1000;
        setTimeout(() => {
            readySetGo.textContent = 'Go';
            showRedDot();
            enableClickDetection();
        }, randomDelay);
    }, 1000);
}

function showRedDot() {
    const redDot = document.getElementById('red-dot');
    const margin = 100;
    const randomX = Math.floor(Math.random() * (window.innerWidth / 2 - margin * 2)) + window.innerWidth / 4 + margin;
    const randomY = Math.floor(Math.random() * (window.innerHeight / 2 - margin * 2)) + window.innerHeight / 4 + margin;

    redDot.style.left = `${randomX}px`;
    redDot.style.top = `${randomY}px`;
    redDot.style.display = 'block';

    let timeout = setTimeout(() => {
        changeOpponentImage(); //Animation for opponent win
        setTimeout(() => {
            alert('You lose!');
            resetGame();
        }, 500); // Delay to show for shooting
    }, 3000);

    redDot.addEventListener('click', handleRedDotClick, { once: true });

    function handleRedDotClick() {
        clearTimeout(timeout);
        changePlayerImage();
        playGunSound();
        animateCowboy2(() => {
            alert('You win!');
            resetGame();
        });
    }
}

function enableClickDetection() {
    document.addEventListener('click', detectOutsideClick, { once: true });
}

function detectOutsideClick(event) {
    const redDot = document.getElementById('red-dot');
    if (!redDot.contains(event.target)) {
        changeOpponentImage(); // Change opponent image to shooting
        setTimeout(() => {
            alert('You lose!');
            resetGame();
        }, 500); // Delay to show the shooting action
    }
}

function changePlayerImage() {
    const playerShooter = document.getElementById('player-shooter');
    playerShooter.src = 'asset/cowboys/cowboy1backshot.png';
}

function changeOpponentImage() {
    const opponentShooter = document.getElementById('opponent-shooter');
    opponentShooter.src = 'asset/cowboys/cowboy2shot.png';
}

function animateCowboy2(callback) {
    const opponentShooter = document.getElementById('opponent-shooter');
    const images = [
        'asset/cowboys/cowboy2gotshot.png',
        'asset/cowboys/cowboy2gotshot2.png',
        'asset/cowboys/cowboy2gotshot3.png'
    ];
    
    images.forEach((image, index) => {
        setTimeout(() => {
            opponentShooter.src = image;
            if (index === images.length - 1 && callback) {
                setTimeout(callback, 1000); // Delay before calling the callback to reset the game
            }
        }, index * 1000);
    });
}

function resetGame() {
    document.getElementById('ready-set-go').textContent = '';
    document.getElementById('red-dot').style.display = 'none';
    document.removeEventListener('click', detectOutsideClick);
    
    const opponentShooter = document.getElementById('opponent-shooter');
    const playerShooter = document.getElementById('player-shooter');

    opponentShooter.src = 'asset/cowboys/cowboy2.png'; 
    playerShooter.src = 'asset/cowboys/cowboy1back.png';
}

function playGunSound() {
    const gunSound = document.getElementById('gun-sound');
    gunSound.currentTime = 8;
    gunSound.play();

    const endGunSound = () => {
        if (gunSound.currentTime >= 10) {
            gunSound.pause();
            gunSound.removeEventListener('timeupdate', endGunSound);
        }
    };

    gunSound.addEventListener('timeupdate', endGunSound);
}
