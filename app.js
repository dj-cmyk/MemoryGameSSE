let cards = document.querySelectorAll(".card");
let scene = document.querySelector(".scene");
let currentScore = document.getElementById("currentscore");
let bestScore = document.getElementById("bestscore");
const startBtn = document.getElementById("startbutton");
const resetBtn = document.getElementById("resetbutton");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;


//START GAME:
//1. select number of cards/difficulty level (default to 8 cards(easy mode)


//2. shuffle cards 
const COLORS = [
    "royalblue",
    "olivedrab",
    "yellow",
    "palevioletred",
    "royalblue",
    "olivedrab",
    "yellow",
    "palevioletred",
    "teal",
    "magenta",
    "teal",
    "magenta"
  ];


//2.5 populate the board
startBtn.addEventListener("click", function(e){
    scene.innerHTML = "";
    populateBoard(shuffle(COLORS));
    startBtn.style.display = "none";
})


//3. reset the board and score
resetBtn.addEventListener("click", function(){
    scene.innerHTML = "";
    if (bestScore.innerText === "0"){
      bestScore.innerText = currentScore.innerText;
    } else if (parseInt(bestScore.innerText) > (parseInt(currentScore.innerText))){
      bestScore.innerText = currentScore.innerText;
    }
    // currentScore.innerText = 0;
    populateBoard(shuffle(COLORS));
})



//FUNCTIONS:

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
  
      // Decrease counter by 1
      counter--;
  
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
  
    return array;
  }
  


function populateBoard(cardArray){
    for (let card of cardArray){
        //create a new div with the class of card
        const newDiv = document.createElement("div");
        newDiv.classList.add("card", "border-0", card);

        //inside that create 2 more divs - one front and one back
        const frontDiv = document.createElement("div");
        const backDiv = document.createElement("div");
        frontDiv.classList.add("card-face", "card-face-front", "border-0", card);
        backDiv.classList.add("card-face", "card-face-back", "border-0", card);
        backDiv.style.backgroundColor = card;

        //append front/back divs to card div
        newDiv.append(frontDiv);
        newDiv.append(backDiv);
        newDiv.style.backgroundColor = card;
        newDiv.addEventListener("click", handleCardClick);

        //append card div to scene
        scene.append(newDiv);

        currentScore.innerText = 0
    }
}


function handleCardClick(e){
    if (noClicking) return;
    if (e.target.parentElement.classList.contains("isFlipped")) return;

    let currentCard = e.target;
   
    if (!card1 || !card2) {
        currentCard.parentElement.classList.add("isFlipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
        currentScore.innerText = parseInt(currentScore.innerText) + 1
      }
    if (card1 && card2) {
        noClicking = true;
        // debugger

        let gif1 = card1.className;
        let gif2 = card2.className;
    
        if (gif1 === gif2) {
          cardsFlipped += 2;
          
          card1.removeEventListener("click", handleCardClick);
          card2.removeEventListener("click", handleCardClick);
          card1 = null;
          card2 = null;
          noClicking = false;
        } else {
          setTimeout(function() {

            card1.parentElement.classList.remove("isFlipped");
            card2.parentElement.classList.remove("isFlipped");
            card1 = null;
            card2 = null;
            noClicking = false;
          }, 1000);
        }
      }

    }
