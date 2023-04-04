/*
Model - Remember a model is the data, the state of your application.  
It contains the classes you need to store data. Example, if you are 
writing an application that displays lists of books, then the model 
will contain a book class and possibly a converter function that can 
take a json representation of a list of books and create an array of 
book objects from it and return it.*/



let button = document.getElementById("play");

button.addEventListener('click', playGame)

const gameLoad = document.querySelector('#gameScreen')

function playGame() {
    // *** Game Setup ***
    let letters = document.getElementById("letters");
    let prompt = document.getElementById("prompt");
    let guessInput = document.getElementById("guessinput");
    let button = document.getElementById("go");
    
    //                                    //
    //           The Game Loop            //
    //                                    //
    
    //Start with getting the word from a JSON file
    
    const requestURL = 'json/words.json';
    
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
          // console.log(jsonObject); // temporary checking for valid response and data parsing
          const words = jsonObject["wordList"];
          // console.log(words) // checking for array format 
    
          let parts = ["head", "torso", "arm-l", "arm-r", "leg-l", "leg-r", "eye-l", "eye-r", "mouth"];
    
          // picks a word at random
          let word = words[Math.floor(Math.random() * words.length)];
    
          // give me a list of empty letters for the word
          let answerArray = [];
          for (let i = 0; i < word.length; i++) {
            answerArray[i] = "_";
          }
    
          console.log(word) // For testing so I know the word :)
    
          // how many letters are left?
          let remainingLetters = word.length;
    
          console.log(remainingLetters) // For testing :)
          
          // while there are still letters to guess
          letters.innerHTML = answerArray.join(" ");
          let guess;
          //let answer;
    
          if (remainingLetters > 0) {
            let submission = () => {
              let guess = guessInput.value;
    
              console.log(guess) // logs guess
    
              let existingLetters = remainingLetters;
    
    
              if (guess.length !== 1) {
                document.querySelector(".Alerts").innerHTML = "Please enter a single letter";
              } else {
                //update the game state with the guess
                for (let i = 0; i < word.length; i++) {
                  // if they were correct
                  if (word[i] === guess) {
                    answerArray[i] = guess;
                    letters.innerHTML = answerArray.join(" ");
                    remainingLetters--;
                  }
                }
    
                // If they got it wrong
                if (existingLetters === remainingLetters) {
                  
                  console.log(parts.length) //verify chances
    
                  // Print remaining chances to screen
                  let chancesLeft = parts.length
                  document.querySelector(".chancesLeft").innerHTML = chancesLeft;
    
                  // Check Progress
                  if (parts.length > 0) {
                    let part = document.getElementById(parts[0]);
                    part.style.display = "block";
                    parts.shift();
                  }
                  else {
                    document.querySelector(".Alerts").innerHTML = "You lost!";
                    // alert("You lost!");
                  }
                }
    
                if (remainingLetters === 0) {
                  letters.innerHTML = answerArray.join(" ");
                  document.querySelector(".Alerts").innerHTML = "Good job! The answer was " + word;
                }
    
              }
    
              // Here is where I take the guess value (the letter) 
              // and create a new element and append to new element.
              let letterGuessed = document.createElement("p");
              let input = document.createTextNode(guess);
              letterGuessed.appendChild(input);
              let element = document.getElementById("lettersPicked");
              element.appendChild(letterGuessed);
    
            };
    
            // Make the Button Work
            button.addEventListener('click', submission, false)
          }
    })
}
