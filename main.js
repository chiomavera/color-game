const colorBox = document.getElementById("colorBox");
// const question = document.getElementById("fa-question")
const colorOptions = document.querySelectorAll(".colorOption");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

const colors = ["red", "blue", "yellow", "purple", "orange", "green"];
let targetColor = "";
let score = 0;

// start a new game

function startNewGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];

  // hide the target color (set it to grey or white)
  colorBox.style.backgroundColor = "transparent";

  // Shuffle colors for buttons using Fisher-Yates shuffle
  const shuffledColors = shuffleArray([...colors]);
  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = shuffledColors[index]
    button.dataset.color = shuffledColors[index]
  });

  gameStatus.textContent = ""; 
}

//Fisher-Yate shuffle algorigthm to random shuffle an array.

function shuffleArray(array) {
    for(let i = array.length -1; i>0; i--) {   
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array
}

function checkGuess(event) {
    const selectedColor = event.target.dataset.color;

    gameStatus.classList.remove("correct", "wrong"); // Remove previous animation classes

    //  Reveal the correct color temporarily
    colorBox.style.backgroundColor = targetColor;

    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.classList.add("correct"); // Apply pop effect
        score++; // Increase score on correct guess

        setTimeout(startNewGame, 2000) // start new round after 1 second
    }else {
        gameStatus.textContent = `Wrong, the right guess is ${targetColor}!`;
        gameStatus.classList.add("wrong");
        if (score > 0) {
            score--; // Decrease score only if it is greater than 0
        }
        
        //After 1s, reset colorBox to grey for a  new guess
        setTimeout(() => {
            colorBox.style.backgroundColor = 'transparent';
            gameStatus.textContent = ""; // clear the error message
        }, 2000);
    }

    // shuffle buttons on wrong guess
    const shuffledColors = shuffleArray([...colors]);
    colorOptions.forEach((button, index) => {
        button.style.backgroundColor = shuffledColors[index];
        button.dataset.color = shuffledColors[index];
    })

    scoreDisplay.textContent = `Score: ${score}`;
}

colorOptions.forEach(button => {
    button.addEventListener('click', checkGuess);
});

newGameButton.addEventListener('click', () => {
    score = 0; // Reset score only when the reset button is clicked
    scoreDisplay.textContent = `Score: ${score}`;
    startNewGame();
})

startNewGame(); 