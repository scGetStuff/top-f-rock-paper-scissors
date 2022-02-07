'strict mode'

const screenLog = document.querySelector(".screen-log");
const ROCK = 'rock';
const PAPER = 'paper';
const SICISSORS = 'scissors';


function logString(s = '') {
    console.log(s);

    const p = document.createElement('p');
    p.innerText = s;
    screenLog.appendChild(p);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function computerPlay() {
    const listOfOptions = [ROCK, PAPER, SICISSORS];
    let index = getRandomInt(3);

    return listOfOptions[index];
}

// default params are just to get intellisense to work; 
// i hate non-static typed languages, need to switch to TypeScript
function playRound(playerSelection = '', computerSelection = '') {
    let looser = false;
    playerSelection = playerSelection.toLowerCase();

    if (playerSelection === computerSelection)
        return { count: 0, msg: `Draw! ${computerSelection}` };

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
            return { count: 0, msg: `invalid value: ${playerSelection}` };
    }

    if (looser)
        return { count: -1, msg: `You Lose! ${computerSelection} beats ${playerSelection}` };

    return { count: 1, msg: `You Win! ${playerSelection} beats ${computerSelection}` };
}

function game() {
    let winCount = 0;
    const loopCount = 5;

    for (let i = 0; i < loopCount; i++) {
        const userValue = window.prompt('Enter a choice', '');
        const ret = playRound(userValue, computerPlay())
        winCount += ret.count
        logString(ret.msg);
    }

    logString(`You ${(winCount > 0) ? 'won' : 'suck'}: ${winCount} out of ${loopCount}`);
}

// logString("Hello, world!")

// for (let i = 0; i < 5; i++)
//     logString(computerPlay());

// logString(playRound('blah', PAPER));

game()

