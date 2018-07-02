/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//set player score container

var scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

function init() {
scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;
winningScore = 0;

    //set all score displays to zero
    var textReset = document.querySelectorAll('.player-score, .player-current-score');
    var i;
    for (i = 0; i < textReset.length; i++) {
    textReset[i].innerText = '0';
    }

    //hide the dice    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
    //reset the player names and active player graphics
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//Check if user entered a winning score value
document.getElementById('winning-score').addEventListener('input', function() {
    winningScore = document.getElementById('winning-score').value;
});

//Check if user started the game
document.querySelector('.btn-roll').addEventListener('click', function() {
      
//if gameplay has started, roll dice
if (gamePlaying) {  
    
    //perform the random roll
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    
 
    //change the image to match the roll
    document.querySelector('.dice1').style.display = 'block';
    document.querySelector('.dice2').style.display = 'block';
    document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice2').src = 'dice-' + dice2 + '.png';

    //if 2 6's, zero score and end turn
    if (dice1 == 6 && dice2 == 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    //if a 1 on either dice, end turn
    } else if (dice1 == 1 || dice2 == 1) {
        nextPlayer();
    //all other cases, add the dice scores and add to the round score.    
    } else {
        var currentRoll = dice1 + dice2;
        roundScore += currentRoll;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;    
    }
}
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    //Reset displays and set active player graphics
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-hold').addEventListener('click', function() {
if (gamePlaying) { 
    //add the current score to the global score
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //Set winning score to 100 if the user didn't enter a value
    if (!winningScore) {
        winningScore = 100;
    }
    //check if the activePlayer won
    if (scores[activePlayer] >= winningScore) {
        //mark the player as a winner
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
       //make the next player active 
        nextPlayer();
    }
}
});

document.querySelector('.btn-new').addEventListener('click', init);





