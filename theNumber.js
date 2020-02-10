const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
let guessCount = 0 //turn counter for guess


function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}
// ********* Game begins below this line*************

const min = 1;
const max = 100;
const acceptableNumbers = aceptNumb();

let thePlayerNumber;
//stores computer guesses in an array
let alreadyGuessed = [];
let compGuesses = comparingNumbers()
// this function generates the computer's guesses
function compGuesses(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// this function starts the game by asking player name and giving them a nickname if they don't put anything in

let name = gameName()
async function gameName() {
    name = await ask('What is your name? ')
    if (name) {
        console.log('Hello ' + caps(name) + '!')
    } else {
        console.log("Hmm, you don't appear to have a name.  I shall call you Peadar")
    }
    return name;
   
}

//turning the name into a lowercase string
function caps(wds) {
    wds = wds.toString().trim().toLowerCase()
    let firstLetter = wds[0].toUpperCase();
    let rest = wds.slice(1);
    return firstLetter + rest;
}
//these two functions get player's number and make sure it's within range, I don't know why I'm getting the "not initialized' error
async function gameStart() {
    thePlayerNumber = await ask('I\'m bored. Play the number game with me.\b Pleeeeeease.Just enter a number between 1 and 100, I\'ll close my eyes.\nType in your number: ');
    thePlayerNumber = parseInt(thePlayerNumber);
    return thePlayerNumber
    
} gameStart();

function aceptNumb(minAcept, maxAcept) {
    minAcept = 1;
    maxAcept = 100;
    while (thePlayerNumber > maxAcept && thePlayerNumber < minAcept) { // ReferenceError: Cannot access 'thePlayerNumber' before initialization
        thePlayerNumber = gettingToGo()
    } 
}
async function gettingToGo() {
    while (acceptableNumbers != aceptNumb) {
        await ask('Hey, no cheating. You wanna be here all day? Pick a number between 1 and 100: ');
        return parseInt(thePlayerNumber);
    }
    console.log('Took you long enough. My first guess is' + compGuesses(1, 100));
    
}

async function comparingNumbers(min, max) {

    let count = 0;
    //getting input from player about whether number is higher or lower
    let computerQuestion = await ask('Is ' + computersGuess + ' the number you chose? ')
    let computerQuestionHighLow = await ask('Is it higher? ')
    let humanAnswer2High = computerQuestionHighLow;
    console.log('First guess. Is your number:  ' + computersGuess);
    console.log(theNumber)

    while (computerNumber !== thePlayerNumber && count < 10) {
        computerNumber(guessMin, guessMax);
        count += 1;
        console.log(computerQuestionHighLow);
        console.log('Hooray!!!!!!  I\'m such a smart computer!!!!! \(Now put some underpants on my head.\)')

        if (humanAnswer2High === 'n' || humanAnswer2High === 'no') {
            guessMax = computersGuess;
            return computerNumber(guessMin, guessMax)

        } else if (humanAnswer2High === 'y' || humanAnswer2High === 'yes') {
            guessMin = computersGuess;
            return computerNumber(guessMin, guessMax)

        }

        await ask(computerQuestion);

    }
    ;
    process.exit
}






