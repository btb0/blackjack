/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

/*----- state variables -----*/
let playerHand
let dealerHand
let cardCountValues
let deck
let shuffledDeck
let turn
let winner

/*----- cached elements  -----*/
const dealerCards = document.getElementById('d-cards')
const playerCards = document.getElementById('p-cards')
const scores = document.querySelector('h3')
const dealCardsBtn = document.getElementById('deal')

/*----- event listeners -----*/
document.getElementById('reset').addEventListener('click', init)
dealCardsBtn.addEventListener('click', dealCards)
// document.getElementById('hit').addEventListener('click', insertFunctionHere)    
// document.getElementById('stand').addEventListener('click', insertFunctionHere) 

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
    dealCardsBtn.classList.remove('disable')
    createDeck()
    shuffleCards()
    render()
}

function createDeck() {
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push(`${suit}${rank}`)
        })
    })
}

function shuffleCards() {
    let tempDeck = [...deck]
    for (let i = tempDeck.length - 1; i > 0; i--) {
        let s = Math.floor(Math.random() * (i + 1))
        let temp = tempDeck[i]
        tempDeck[i] = tempDeck[s]
        tempDeck[s] = temp
    }
    shuffledDeck = [...tempDeck]
}

function dealCards() {
    for (let i = 0; i < 2; i++) {
        playerHand.push(shuffledDeck[0])
        shuffledDeck.shift()
        dealerHand.push(shuffledDeck[0])
        shuffledDeck.shift()
    }
    dealCardsBtn.classList.add('disable')
    console.log(playerHand)
    console.log(dealerHand)
}

function render() {
    renderCards()
    renderScores()
    renderMessages()
}

function renderCards() {

}

function renderScores() {

}

function renderMessages() {

}