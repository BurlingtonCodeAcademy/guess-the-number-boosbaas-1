const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}
// ********* Game begins below this line*************

//Computer asks player to enter a number. that number doesn't change for the rest of the game.

let min = 0;
let max = 100;
let turn = 1 //turn counter for guess
let playerChoosesNumber = choosingTheNumber(min, max);
let thePlayerNumber 
let computersGuess = parseInt((Math.floor(Math.random() * (max - min + 1)) + min))
let keepTrackCompGuesses = [];


async function choosingTheNumber() {
    playerChoosesNumber = await ask('I\'m bored. Play the number game with me.\b Pleeeeeease.Just enter a number between 1 and 100, I\'ll close my eyes. Type in your number\n> ');
    async function needToChooseAgain() {

        while (playerChoosesNumber >= min && playerChoosesNumber <= max) {
            thePlayerNumber = parseInt(playerChoosesNumber)
            break
        }
        while (playerChoosesNumber >= max) {
            let tryAgain = await ask("nope. gotta be between 0 and 100 try again \n > ");
            playerChoosesNumber = tryAgain;
        }
        while (playerChoosesNumber < min) {
            tryAgain = await ask("nope. gotta be between 0 and 100 try again \n > ");
            playerChoosesNumber = tryAgain
        }

        console.log("Awesome possum, you chose " + thePlayerNumber + ". Now I get 10 turns to try to guess your number.");

        comparingNumbers(thePlayerNumber, computersGuess)
    }
    needToChooseAgain(playerChoosesNumber)

    async function comparingNumbers(thePlayerNumber, computersGuess) {

      let computerQuestion = await ask('Is ' + computersGuess + ' the number you chose?\n> ')
        if (computersGuess==thePlayerNumber) {
            console.log(`I won! Only took me ${turn} turns. Thanks for playing! `)
            process.exit()
        } else  {
            while (turn < 11 && computersGuess !== thePlayerNumber) {
                let highLow = await ask("is it higher?\n>  ")

                if (highLow === "y") {
                    min = computersGuess + 1;
                } else {
                    max = computersGuess;
                }

                keepTrackCompGuesses.push(computersGuess)
                computersGuess = Math.floor((max + min) / 2)
                await ask(`Okay, So far I've guessed ${keepTrackCompGuesses} and I've got ${10 - turn} turns left.\n Is your number ${computersGuess}? \n>  `)
                turn++
            }
           if (turn > 10) {
                console.log("How did that happen? You won.")
                process.exit()
            } else {
                console.log("You win! Thanks for playing")
                process.exit()
            }

        }

    }
}





















