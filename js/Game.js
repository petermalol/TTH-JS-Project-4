/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

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