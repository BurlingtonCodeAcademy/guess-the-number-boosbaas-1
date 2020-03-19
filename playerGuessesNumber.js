const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}
// ********* Game begins below this line*************

//Computer asks player to enter a number. that number doesn't change for the rest of the game.QUESTION can I assign this variable to a constant
//game on
//Variables

let min = 0;
let max = 100;
let turn = 1; //turn counter for guess
let playersGuess = 0;
let theComputerNumber = parseInt((Math.floor(Math.random() * (max - min + 1)) + min));
let keepTrackPlayersGuesses = [];
let tries = 1;
//keep those guesses in range.
async function gameStart() {
    let firstGuess = await ask('I\'m bored. Play the number game with me.\b Pleeeeeease.\nI\m going to think of a number between 1 and 100, then you have 10 tries to guess it.\nIt\'s easy, all you have to do is type in a number each time you want to guess.\n>');

    while (firstGuess !== theComputerNumber || firstGuess > max || firstGuess < min) {
        firstGuess = parseInt(firstGuess);
        if (firstGuess === theComputerNumber) {
            console.log("whoa got on the first try!")
            process.exit
        } else if (firstGuess < max && firstGuess > min) {
            console.log("alrighty, let the game begin")
            playersGuess = firstGuess
            break

        } else if (firstGuess > max) {
            let tryAgain = await ask(`nope. Take ${tries} too high. gotta be less than 100. Try again.\n > `);
            firstGuess = parseInt(tryAgain);

        } else if (firstGuess < min) {
            tryAgain = await ask(`nope. Not gonna go negative here. This is try number ${tries}. Try again.\n > `);

            firstGuess = parseInt(tryAgain);

        }

        tries++
    }

    comparingNumbers(playersGuess, theComputerNumber)
}
gameStart(playersGuess)

async function comparingNumbers() {
    playersGuess = await ask(" You guessed " + playersGuess + " You're wrong but you gotta start someplace. Try again.\n> ");
    //console.log(`TEST computer number ${theComputerNumber}`)
    while (turn < 10 && playersGuess !== theComputerNumber) {
        keepTrackPlayersGuesses.push(playersGuess);
        if (playersGuess > theComputerNumber) {
            playersGuess = await ask(`Too high, but you've still got ${10 - turn} turns left. Here are the numbers you've guessed so far: ${keepTrackPlayersGuesses}\n> `)
        } else if (playersGuess < theComputerNumber) {
            playersGuess = await ask(`Too low, but you've still got ${10 - turn} turns left. Here are the numbers you've guessed so far: ${keepTrackPlayersGuesses}\n> `)
        } 
        turn++

    }
    if (playersGuess == theComputerNumber) {
        console.log(`You won! Thanks for playing!`)
        process.exit()
    } else if (turn === 10) {
        console.log("How did you run out of turns so quickly? I win.")
        process.exit()
    } else {
        console.log("wtf?")  //when aliens land and my code goes weird and I don't know why.
        process.exit()
    }
}



























