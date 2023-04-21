/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/*
Create a new instance of the Game class and add event listeners for the start button and onscreen keyboard buttons:
-Add a click event listener to the "Start Game" button which creates a new Game object and starts the game by calling the startGame() method.
-Add click event listeners to each of the onscreen keyboard buttons, so that clicking a button calls the handleInteraction() method on the Game object. 
    Event delegation can also be used in order to avoid having to add an event listener to each individual keyboard button. 
    Clicking the space between and around the onscreen keyboard buttons should not result in the handleInteraction() method being called.
*/
let phraseList = [
    "Hello World",
    "Goodbye World",
    "You Win",
    "You Lose",
    "Is this thing on",
    "I love Javascript",
    "I am lost",
    "To err is to be",
    "To do is to be",
    "To be is to do",
    "Do be do be do",
    "Scooby do"
]

let phraseHolder = document.querySelector("#phrase ul")
const keyboard = document.querySelectorAll(".keyrow")
let startGameBtn = document.getElementById("btn__reset")

startGameBtn.addEventListener("click", createGame)

function createGame(){
    let game = new Game (0, phraseList, null)
    game.startGame()

    //create keyboard input
    document.addEventListener("keydown", findPressedKey)

    //create eventlistener for each button
    keyboard.forEach((row) => {
        row.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") {
                game.handleInteraction(event.target)
            }
        })
    })
}

function findPressedKey(event) {
    setTimeout(100)
    let keyPress = event.key;
    keyboard.forEach((row) => {
        row.childNodes.forEach((letter) => {
            if(letter.textContent === keyPress){
                letter.click()
            }
        })
    })
}