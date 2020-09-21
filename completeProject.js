const readline = require('readline'); // I need to know more about this
const rl = readline.createInterface(process.stdin, process.stdout);// I need to know more about this

function ask(questionText) { // I need to better undersatnd this function. How to set it up and why like this
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    }); 
}
let min = 1 
let max = 100
let compGuess = randomInteger(min, max) // setting the random number function to a variable

function binSearch(min, max) {
  return(min + max) / 2 // making the guess process quicker my division
}


async function initialize(){ // allows the games to rotate. 
  let gameChoice = await ask("We will be playing a number guessing game. \nWe will take turns guessing each others\nnumber betweeen 1 and whatever you choose.\nIf you would like me to guess \nyour number first, enter 1. \nIf you want to guess mine first, enter 2. ")

  if (gameChoice === "1"){ // chooses game
  start()
}
  else if(gameChoice === "2"){ // chooses game
    startTwo()
  }
}


initialize() // calls the function

async function start() {
    
    console.log("Let's play the game. \nI will guess a number of your choosing \nbetween 1 and whatever number you like. ")
  
    
    let initAnswer = await ask("Please give me a max number (greater than 1)? ");
    initAnswer = parseInt(initAnswer); //change from string to number
    if (initAnswer > 1){ // if the number given is greater than 1
        max = initAnswer; // its the max range
    }else{ // if not computer is annoyed and assigns 100 as #
        console.log(`${initAnswer} is not a valid number greater than 1. \nSince you cannot follow directions \nwe will just play using ${max}`)

    }    
    max = initAnswer // had to assign it again here as any number under 100 was not being recognized
    console.log("Let us begin")
    let answer = await ask(`is your number ${compGuess} ? `) // let the games begin // ` is handy for this ${something}`


    while (answer !== "yes") { // if the answer isnt yes
        let hint = await ask("Higher or Lower? ")  // ask h or l

        if (hint === "higher") { // if its higher
         if(compGuess === min-1){
           console.log("youre cheating")
         }
          else { min = compGuess+1 // raise the min
            compGuess = binSearch(min, max) // assign compGuess to binsearch function
            compGuess = Math.floor(compGuess) // get rid of decimals
          }
            
        } 
        else if (hint === "lower") { // if its lower
          if(compGuess === max+1){
            console.log("You're cheating")
          }
           else {

            max = compGuess-1 // lower the max
            compGuess = binSearch(min, max) // see above
            compGuess = Math.floor(compGuess) // see above
           }
        }
        answer = await ask(`is your number ${compGuess} ? `) // new random number generated
    }

    if (answer === "yes") { // number guess correctly
        console.log("Winner!!") // game over
      //  process.exit(); // lets get outta here// we dont need this when combining games 1 and 2
      startTwo() // calls game 2 function


    }
}

async function startTwo() {
  console.log("Lets play a number guessing game. \nI will guess the number that you select \nbetween 1 and any number higher than one that you like. \nFor example 1 -100 or 1 - 2732 and so on")
  let maxNum = await ask("what is the number greater than 1 \nthat you would like to pick to \nstart our game? ")

  maxNum = parseInt(maxNum); //change from string to number
  secretNumber = Math.floor(Math.random() * maxNum + 1);
  if (maxNum > 1) { // if the number given is greater than 1
    max = maxNum; // its the max range
  } else { // if not computer is annoyes and assigns 100 as #
    console.log(`${maxNum} is not a valid number greater than 1. Since you cannot follow directions we will just play using ${max}`)

  }
  let guess = await ask(`Excellent. Please enter a number betweeen 1 and ${maxNum}. `)
  guess = parseInt(guess) // changes guess to number from string
  while (guess !== secretNumber) { // while guess is not equal to the secret number


    if (guess < secretNumber) { // if guess is less than secret number

      guess = await ask("Sorry, pick a higher number. ") // say sorry higher
guess = parseInt(guess) // chnage guess to number
    }
    else if (guess > secretNumber) { // if guess is greater than the secret number...
      guess = await ask("Sorry pick a lower number. ") // say sorry pick lower
guess = parseInt(guess) // change string to number again? How can I just change it once and not keep writing it over?

    }
  }
  console.log("Winner!") // if nothing in the loop happens we end up here...WINNER
  start() // we call start function to go back to game 1

}






function randomInteger(min, max) { // random number generator
    let range = max - min + 1;
    return min + Math.floor(Math.random() * range); // why didnt this fix my decimal problem??
}
