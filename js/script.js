/*----- constants -----*/
const suits = ['d', 'h', 'c', 's']
const ranks = ['02', '03', '04', '05', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

/*----- state variables -----*/
let playerHand
let dealerHand
let cardCountValues
let deck
let turn
let winner

/*----- cached elements  -----*/
const dealerCards = document.getElementById('d-cards')
const playerCards = document.getElementById('p-cards')
const scores = document.querySelector('h3')

/*----- event listeners -----*/
document.getElementById('reset').addEventListener('click', init)
document.getElementById('hit').addEventListener('click', insertFunctionHere)    // add function
document.getElementById('stand').addEventListener('click', insertFunctionHere) // add function

/*----- functions -----*/
init ()

function init() {
    playerHand = []
    dealerHand = []
    deck = []
    cardCountValues = {
        player: 0,
        dealer: 0
    }
    winner = false
    shuffleDeck()
    render()
}

function shuffleDeck() {

}

function render() {

}