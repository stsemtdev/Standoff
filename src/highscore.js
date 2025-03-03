document.getElementById("highscore-button").addEventListener('click', () => {
    document.getElementById('start-menu').style.display = 'none';
    document.getElementById('highscore-screen').style.display = 'block';
})

document.getElementById("highscore-back-button").addEventListener('click', () => {
    document.getElementById('start-menu').style.display = 'flex';
    document.getElementById('highscore-screen').style.display = 'none';
})