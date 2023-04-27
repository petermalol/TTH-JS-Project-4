/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor(){
        this.missed = 0;
        this.phrases = [
            new Phrase("Hello World"),
            new Phrase("Goodbye World"),
            new Phrase("You Win"),
            new Phrase("You Lose"),
            new Phrase("Is this thing on"),
            new Phrase("I love Javascript"),
            new Phrase("I am lost"),
            new Phrase("To err is to be"),
            new Phrase("To do is to be"),
            new Phrase("To be is to do"),
            new Phrase("Do be do be do"),
            new Phrase("Scooby do")
        ];
        this.activePhrase = null;
    }

    //initiates game
    startGame(){
        let overlay = document.getElementById("overlay")
        overlay.style.display = "none";
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()
        console.log(this.activePhrase)
    }

    //chooses random phrase and returns it
    getRandomPhrase(){
        let randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)]
        return randomPhrase;
    }

    //checks inputed letter and acts if its right, otherwise sends to removeLife
    handleInteraction(guess){
        console.log(guess)
        if(this.activePhrase.checkLetter(guess)){
            this.activePhrase.showMatchedLetter(guess)
            
        }else{
            this.removeLife(guess)
        }
        this.checkForWin()
    }

    //disables wrongly guessed letter, changes class to "wrong" and changes hearts to lostHeart
    removeLife(guess){
        console.log("Removed life")
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
        document.removeEventListener("keydown", findPressedKey)
        while (phraseHolder.firstChild){
            phraseHolder.removeChild(phraseHolder.firstChild)
        }
        keyboard.forEach((row) => {
            row.removeEventListener("click", (event) => {
                if (event.target.tagName === "BUTTON") {
                    game.handleInteraction(event.target)
                }
            })
        })
        document.querySelectorAll(".key").forEach((letter) => {letter.disabled = false})
        document.querySelectorAll(".wrong").forEach((letter) => {letter.classList.remove("wrong")})
        document.querySelectorAll(".chosen").forEach((letter) => {letter.classList.remove("chosen")})
        document.querySelectorAll(".tries").forEach((heart) => heart.querySelector("img").src = "images/liveHeart.png")
        document.getElementById("overlay").style.display = "flex";
        startGameBtn.textContent = "Start New Game"
        document.getElementById("game-over-message").textContent = endMessage
        this.activePhrase = null
    }
}