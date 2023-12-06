const buttonNewGame = document.querySelector('.newGame');
const buttonRollDie = document.querySelector('.rollDice');
const buttonHold = document.querySelector('.hold');
const die = document.querySelector('.die');
const dieBox = document.querySelector('.dieBox');
const span = document.querySelector('span');

// Declaring variables to be used

const player = {
    one: {
        sumDie: 0,
        sumScore: 0,
        playing: document.querySelectorAll('.gameBox')[0],
        dieDisplay: document.querySelector('.p1SumDie'),
        scoreDisplay: document.querySelector('.p1SumScore'),
    },
    two: {
        sumDie: 0,
        sumScore: 0,
        playing: document.querySelectorAll('.gameBox')[1],
        dieDisplay: document.querySelector('.p2SumDie'),
        scoreDisplay: document.querySelector('.p2SumScore'),
    },
};

const dieFace = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

let p1IsPlaying = true;
let dieRoll = 0;

// Adding the listeners

buttonHold.addEventListener('click', togglePlayer);

buttonRollDie.addEventListener('click', evt => {
    dieRoll = rando(6);
    die.textContent = dieFace[dieRoll - 1];
    if (dieRoll) dieBox.style.backgroundColor = 'white';
    if (dieRoll === 1) {
        sumDieReset();
        togglePlayer();
    } else {
        playerCheck();
    }
    if (player.one.sumScore + player.one.sumDie >= 10) playerWon('P1 wins!');
    if (player.two.sumScore + player.two.sumDie >= 10) playerWon('P2 wins!');
});

buttonNewGame.addEventListener('click', reset);

// Function declarations

// Toggle mechanics

function togglePlayer() {
    player.one.playing.classList.toggle('chosen');
    player.two.playing.classList.toggle('chosen');
    if (p1IsPlaying) {
        player.one.sumScore += player.one.sumDie;
        player.one.scoreDisplay.textContent = player.one.sumScore;
        p1IsPlaying = false;
    } else {
        player.two.sumScore += player.two.sumDie;
        player.two.scoreDisplay.textContent = player.two.sumScore;
        p1IsPlaying = true;
    }
    sumDieReset();
}

// Random number generator given max value

function rando(maxNum) {
    return Math.floor(Math.random() * maxNum) + 1;
}

// Game mechanics

function playerCheck() {
    if (p1IsPlaying) {
        player.one.sumDie += dieRoll;
        player.one.dieDisplay.textContent = player.one.sumDie;
    } else {
        player.two.sumDie += dieRoll;
        player.two.dieDisplay.textContent = player.two.sumDie;
    }
}

// Resetting during toggle

function sumDieReset() {
    dieRoll = 0;
    player.one.sumDie = 0;
    player.one.dieDisplay.textContent = '0';
    player.two.sumDie = 0;
    player.two.dieDisplay.textContent = '0';
}

// Resetting the game

function reset() {
    sumDieReset();
    dieReset();
    player.one.sumScore = 0;
    player.one.scoreDisplay.textContent = '0';
    player.two.sumScore = 0;
    player.two.scoreDisplay.textContent = '0';
    player.one.playing.classList.add('chosen');
    player.two.playing.classList.remove('chosen');
    span.textContent = '';
    buttonHold.removeAttribute('disabled');
    buttonRollDie.removeAttribute('disabled');
}

// Resetting the die

function dieReset() {
    if (!dieRoll) dieBox.style.backgroundColor = 'transparent';
    die.textContent = '';
}

// Winning the game

function playerWon(str) {
    buttonHold.setAttribute('disabled', true);
    buttonRollDie.setAttribute('disabled', true);
    span.textContent = str;
}
