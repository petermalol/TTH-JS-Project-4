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

let phraseHolder = document.querySelector("#phrase ul")
const keyboard = document.querySelectorAll(".keyrow")
let startGameBtn = document.getElementById("btn__reset")

startGameBtn.addEventListener("click", createGame)


function createGame(){
    game = new Game();
    game.activePhrase = null;
    game.startGame();

    //create keyboard input
    document.addEventListener("keydown", findPressedKey)
    
    //create eventlistener for each button
    keyboard.forEach((row) => {
        row.addEventListener("click", clickAction)
    })

}

function clickAction(event){
    if (event.target.tagName === "BUTTON") {
        game.handleInteraction(event.target)
    }
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