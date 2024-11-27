"use strict"

const btn__roll = document.querySelector(".btn--roll");
const dice = document.querySelector("img.dice");
let current = document.querySelector(".current--0");
const player__0 = document.querySelector(".player--0");
const player__1 = document.querySelector(".player--1");
const btnHold = document.querySelector(".btn--hold");
const score0El = document.querySelector(".score--0");
const score1El = document.querySelector(".score--1");
const btnNew = document.querySelector(".btn--new");

// Starting Game
let scores, currentScore, activePlayer, playing;
const init = function(){   
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    player__0.classList.remove("winner");
    player__1.classList.remove("winner");
    player__0.classList.add("player--active");
    dice.classList.add("hidden");
}
init();

// Switching Player
const switchPlayer = function(){
    player__0.classList.toggle("player--active");
    player__1.classList.toggle("player--active");
    currentScore = 0;
    document.querySelector(`.current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
}    

// Dice Rolling 
btn__roll.addEventListener("click", function(){
    if(playing){
    // Rolling Dice
    let num = Number(Math.trunc(Math.random()* 6) + 1);
    dice.src = `Img/dice-${num}.png`;
    dice.classList.remove("hidden");


    if(num === 1){
        // Switch to next Player
        switchPlayer();
        dice.classList.remove('hidden');  
}else{
    // Current Score
    currentScore += num;
    document.querySelector(`.current--${activePlayer}`).textContent = currentScore;
}
    }
});



// Hold button functionality
btnHold.addEventListener("click", function(){
    if(playing){

    // Score of activePlayer
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent = scores[activePlayer];

    // Winner
    if(scores[activePlayer] >= 50){
        // Button Disabled
        playing = false; 
        // 
        player__1.classList.add("player--active");

        // Winner Color 
        document.querySelector(`.player--${activePlayer}`).classList.add("winner");
        dice.classList.add("hidden");
    }

    // Switch to next Player
    switchPlayer();
    dice.classList.add('hidden');
}
});

// New Game Button Functionality
btnNew.addEventListener("click", init);
