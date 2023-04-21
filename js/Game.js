/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


/*
Create the Game class in the Game.js file.

The class should include a constructor that initializes the following properties:
-missed: used to track the number of missed guesses by the player. The initial value is 0, since no guesses have been made at the start of the game.
-phrases: an array of five Phrase objects to use with the game. A phrase should only include letters and spaces— no numbers, punctuation or other special characters.
-activePhrase: This is the Phrase object that’s currently in play. The initial value is null. Within the startGame() method, this property will be set to the Phrase object returned from a call to the getRandomPhrase() method.

The class should also have these methods:

startGame(): hides the start screen overlay, calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase. 
It also adds that phrase to the board by calling the addPhraseToDisplay() method on the activePhrase property.

getRandomPhrase(): this method randomly retrieves one of the phrases stored in the phrases array and returns it.

handleInteraction(): this method controls most of the game logic. It checks to see if the button clicked by the player matches a letter in the phrase, 
and then directs the game based on a correct or incorrect guess. This method should:
-Disable the selected letter’s onscreen keyboard button.
-If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
-If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, and then call the checkForWin() method. If the player has won the game, also call the gameOver() method.

removeLife(): this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) and increments the missed property. If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.

checkForWin(): this method checks to see if the player has revealed all of the letters in the active phrase.

gameOver(): this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, 
and replaces the overlay’s start CSS class with either the win or lose CSS class.
*/

class Game{
    constructor(missed, phrases, activePhrase){
        this.missed = missed;
        this.phrases = phrases;
        this.activePhrase = null;
    }

    //initiates game
    startGame(){
        let overlay = document.getElementById("overlay")
        overlay.style.display = "none";
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()
    }

    //chooses random phrase and returns it
    getRandomPhrase(){
        let randomPhrase = this.phrases[Math.floor(Math.random() * 12)]
        return new Phrase(randomPhrase)
    }

    //checks inputed letter and acts if its right, otherwise sends to removeLife
    handleInteraction(guess){
        this.activePhrase //i have no idea why but if i remove this line it shows errors that this.activePhrase is null, also works if it is written like console.log(this.activePhrase)
        if(this.activePhrase.checkLetter(guess) == true){
            phraseHolder.childNodes.forEach(letter => {
                if(letter.textContent == guess.textContent){
                    //when inputed letter is found, disable and marked as right guess
                    letter.classList.replace("letter", "show")
                    guess.disabled = true;
                    guess.classList.add("chosen")
                    this.checkForWin()
                }
            });
        }else{
            this.removeLife(guess)
        }
    }

    //disables wrongly guessed letter, changes class to "wrong" and changes hearts to lostHeart
    removeLife(guess){
        guess.disabled = true;
        guess.classList.add ("wrong")
        let tries = document.querySelectorAll(".tries")
        let currentHeart = tries[this.missed].querySelector("img")
        currentHeart.src = "images/lostHeart.png"
        this.missed = this.missed + 1
        //if missed becomes 5 it sends player to gameOver with message "You lost"
        if(this.missed == 5){
            this.gameOver("You lost :( ")
        }
    }

    //checks if there are any unguessed letters in phraseholder and if no sends to gameOver
    checkForWin(){
        let gameOverCondition = true;
        phraseHolder.childNodes.forEach(letter => {
            if(letter.classList.contains("letter")){
                gameOverCondition = false;
            }
        })
        if(gameOverCondition == true){this.gameOver("You Win!!! :D")}
    }

    //resets game and shows endscreen
    gameOver(endMessage){
        this.activePhrase = null
        document.removeEventListener("keydown", findPressedKey)
        while (phraseHolder.firstChild){
            phraseHolder.removeChild(phraseHolder.firstChild)
        }
        document.querySelectorAll(".key").forEach((letter) => {letter.disabled = false})
        document.querySelectorAll(".wrong").forEach((letter) => {letter.classList.remove("wrong")})
        document.querySelectorAll(".chosen").forEach((letter) => {letter.classList.remove("chosen")})
        document.querySelectorAll(".tries").forEach((heart) => heart.querySelector("img").src = "images/liveHeart.png")
        document.getElementById("overlay").style.display = "flex";
        startGameBtn.textContent = "Start New Game"
        document.getElementById("game-over-message").textContent = endMessage
    }
}