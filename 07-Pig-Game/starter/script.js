'use strict';

let scores , roundScore , activePlayer , gamePlaying, prevRoll, winningScore;

const init = () =>{
scores = [0, 0]
roundScore = 0
activePlayer = 0
gamePlaying = true


document.getElementById('score--0').textContent ='0'
document.getElementById('score--1').textContent ='0'
document.getElementById('current--0').textContent ='0'
document.getElementById('current--1').textContent ='0'

document.getElementById('name--0').textContent ='Player 1'
document.getElementById('name--1').textContent ='Player 2'

document.querySelector('.player--0').classList.remove('player--winner')
document.querySelector('.player--1').classList.remove('player--winner')

document.querySelector('.player--0').classList.remove('player--active')
document.querySelector('.player--0').classList.add('player--active')
document.querySelector('.player--1').classList.remove('player--active')

}

init()


document.querySelector('.dice').style.display = 'none'

document.querySelector('.btn--roll').addEventListener('click' , () => {

    if(gamePlaying){
    
    let dice = Math.floor(Math.random()* 6) + 1
    if(prevRoll === dice){
        scores[activePlayer] = 0
        document.querySelector(`#score--${activePlayer}`).textContent = 0
        nextPlayer()
    }
    prevRoll = dice;
    
    let diceDOM = document.querySelector('.dice')
  
    diceDOM.style.display = 'block'
    diceDOM.src = `dice-${dice}.png`

    // updating the orunf score
    if( dice!== 1 ){
        roundScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent = roundScore
    } else{
        // Next player
        nextPlayer()
        
    }
}
     
})

document.querySelector('.btn--hold').addEventListener('click' , () => {
    if(gamePlaying){
    scores[activePlayer] += roundScore 
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]
    
    winningScore = document.querySelector('.final-score').value
    if(!winningScore){
        winningScore = 50
    }

    // checking player won the game
    if(scores[activePlayer] >=winningScore){
       document.querySelector(`#name--${activePlayer}`).textContent = `Winner`
       document.querySelector('.dice').style.display = 'none'
       document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`)
       document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`)

       gamePlaying = false

    }else{
        nextPlayer()
    } 
}

})

const nextPlayer = () =>{
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
        roundScore = 0
        document.getElementById('current--0').textContent ='0'
        document.getElementById('current--1').textContent ='0'

        document.querySelector(`.player--0`).classList.toggle(`player--active`)
        document.querySelector(`.player--1`).classList.toggle(`player--active`)
        document.querySelector('.dice').style.display = 'none'
}


document.querySelector('.btn--new').addEventListener('click' , init)


