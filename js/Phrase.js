/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay(){
        //create an array of letters
        let phraseArr = this.phrase.split("");

        //iterate over each letter in the phraseArr, creating a li item for each one and appending it to the ul called phraseholder
        phraseArr.forEach(letter => {
            if(letter !== " "){
                const currentLetter = document.createElement("li")
                currentLetter.textContent = letter
                currentLetter.className = "letter"
                phraseHolder.appendChild(currentLetter)
            }else{
                const space = document.createElement("li")
                space.className = "space"
                phraseHolder.appendChild(space)
            }
        });
    }

    checkLetter(guess){
        let letterIsPresent = false;
        let phraseLetters = this.phrase.split("");
        phraseLetters.forEach((letter => {
            if (letter === guess.textContent){
                letterIsPresent = true;
            }
        })) 
        return letterIsPresent;
    }
}