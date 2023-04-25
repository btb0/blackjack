/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']

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
document.getElementById('reset').addEventListener('click', resetGame)
dealCardsBtn.addEventListener('click', dealCards)
document.getElementById('hit').addEventListener('click', addCardToHand)    
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
            deck.push({
                // Maps to CSS classes for cards
                face: `${suit}${rank}`,
                // Setting the values -> Number value = 02-10; if rank = A, it is 
                // an ace so value = 11, otherwise its a face card so value = 10
                value: Number(rank) || (rank === 'A' ? 11 : 10)
            })
        })
    })
}

// Fisher-Yates Shuffle Algorithm
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
        playerHand.push(`${shuffledDeck[0]}`)
        dealerHand.push(`${shuffledDeck[1]}`)
        shuffledDeck.splice(0, 2)
    }
    console.log(playerHand)
    console.log(dealerHand)
    console.log(shuffledDeck)
}

function resetGame() {
    // TODO: - Make it remove all the current cards on the table
    document.getElementById('p-one').className = 'card'
    document.getElementById('d-one').className = 'card'
    document.getElementById('p-two').className = 'card'
    document.getElementById('d-two').className = 'card'
    const newCards = document.querySelectorAll('.new-card')
    newCards.forEach(card => {
        card.remove()
    })
    init()
}

function addCardToHand() {
    let newCard = document.createElement('div')
    newCard.classList.add('card', 'new-card')
    newCard.classList.add(`${shuffledDeck[0]}`)
    playerHand.push(`${shuffledDeck[0]}`)
    shuffledDeck.shift()
    playerCards.append(newCard)
    console.log(playerHand)
}

function render() {
    renderCards()
    renderScores()
    renderTotals()
    renderMessages()
}

// INCOMPLETE
function renderTotals() {
    
    document.getElementById('p-total').innerText = `Total: `
    document.getElementById('d-total').innerText = `Total: `
}

function renderCards() {
    playerHand.forEach(card => {
        
    })
    // dealCardsBtn.classList.add('disable')
}

function renderScores() {

}

function renderMessages() {

}