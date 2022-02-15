'strict mode'

const screenLog = document.querySelector(".screen-log");
const ROCK = 'rock';
const PAPER = 'paper';
const SICISSORS = 'scissors';
const scoreCounters = { win: 0, draw: 0, lose: 0, count: 0 };

const btns = document.querySelectorAll('.action button');
btns.forEach(btn => btn.addEventListener('click', userChoice));


function logString(s) {
    const p = document.createElement('p');
    p.innerText = s;
    screenLog.appendChild(p);
}

function userChoice(e) {
    scoreCounters.count++;
    const ret = playRound(this.id, computerPlay());

    if (ret.status === 0)
        scoreCounters.draw++;
    if (ret.status === 1)
        scoreCounters.win++;
    if (ret.status === -1)
        scoreCounters.lose++;

    updateCounters();
    logString(ret.msg);
    checkEndGame();
}

function updateCounters() {
    updateStat('win', scoreCounters.win);
    updateStat('draw', scoreCounters.draw);
    updateStat('lose', scoreCounters.lose);
    updateStat('count', scoreCounters.count);
}

function updateStat(fieldName, newNum) {
    const field = document.querySelector(`#${fieldName}`);
    field.value = newNum;
}

function checkEndGame() {
    // TODO: looks like alert is not letting the last number update in UI
    // probably doing too much in event handler, need something better
    if (scoreCounters.win === 5 || scoreCounters.lose === 5) {
        alert(`You ${(scoreCounters.win > scoreCounters.lose) ? 'won' : 'lose'}`);
        reset();
    }
}

function reset() {
    scoreCounters.win = 0;
    scoreCounters.draw = 0;
    scoreCounters.lose = 0;
    scoreCounters.count = 0;

    // clean up the log junk from previous game
    const list = screenLog.children;
    const len = list.length;
    for (let i = len - 1; i > 0; i--)
        list.item(i).remove();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function computerPlay() {
    const listOfOptions = [ROCK, PAPER, SICISSORS];
    let index = getRandomInt(3);
    return listOfOptions[index];
}

function playRound(playerSelection, computerSelection) {
    let looser = false;
    playerSelection = playerSelection.toLowerCase();

    // console.log({playerSelection, computerSelection});

    if (playerSelection === computerSelection)
        return { status: 0, msg: `Draw! ${computerSelection}` };

    switch (playerSelection) {
        case ROCK:
            looser = (computerSelection === PAPER)
            break;
        case PAPER:
            looser = (computerSelection === SICISSORS)
            break;
        case SICISSORS:
            looser = (computerSelection === ROCK)
            break;
        default:
            return { status: 0, msg: `invalid value: ${playerSelection}` };
    }

    if (looser)
        return { status: -1, msg: `You Lose! ${computerSelection} beats ${playerSelection}` };

    return { status: 1, msg: `You Win! ${playerSelection} beats ${computerSelection}` };
}

reset();
updateCounters();