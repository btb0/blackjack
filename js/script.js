/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']

/*----- state variables -----*/
let playerHand
let dealerHand
let deck
let shuffledDeck
let turn
let winner

/*----- cached elements  -----*/
const dealerCards = document.getElementById('d-cards')
const playerCards = document.getElementById('p-cards')
const scores = document.querySelector('h3')
const dealCardsBtn = document.getElementById('deal')
const standBtn = document.getElementById('stand')
const hitBtn = document.getElementById('hit')

/*----- event listeners -----*/
document.getElementById('reset').addEventListener('click', resetGame)
dealCardsBtn.addEventListener('click', dealCards)
hitBtn.addEventListener('click', addCard)    
standBtn.addEventListener('click', endTurn) 

/*----- functions -----*/
init ()

function init() {
    playerHand = []
    dealerHand = []
    deck = []
    winner = ''
    turn = true
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
        playerHand.push(shuffledDeck[0])
        dealerHand.push(shuffledDeck[1])
        shuffledDeck.splice(0, 2)
    }
    console.log(playerHand)
    console.log(dealerHand)
    console.log(shuffledDeck)
    dealCardsBtn.disabled = true
    render()
}

function calcHandValues(hand) {
    let sum = 0
    let aces = 0
    hand.forEach(card => {
        sum += card.value
        if (card.face[1] === 'A') {
            aces += 1
        }
    })
    while (sum > 21 && aces) {
        sum -= 10
        aces -= 1
    }
    return sum
    render()
}

function checkWinner() {
    let playerScore = calcHandValues(playerHand)
    let dealerScore = calcHandValues(dealerHand)
    console.log(playerScore)
    console.log(dealerScore)
    if (playerScore === 21 && playerHand.length === 2) {
        return winner = 'player blackjack'
    } else if (dealerScore === 21 && dealerHand.length === 2) {
        return winner = "dealer blackjack"
    } else if (playerScore > 21) {
        return winner = 'bust dealer wins'
    } else if (dealerScore > 21) {
        return winner = 'bust player wins'
    } else if (playerScore > dealerScore) {
        return winner = 'player'
    } else if (dealerScore > playerScore) {
        return winner = 'dealer'
    } else if (playerScore === dealerScore) {
        return winner = 'push'
    } 
}

function resetGame() {
    // TODO: - Make it remove all the current cards on the table
    // while (playerCards.firstChild) {
    //     playerCards.removeChild(playerCards.lastChild)
    // }
    init()
}

// Hit
function addCard() {
    playerHand.push(shuffledDeck[0])
    let newCard = document.createElement('div')
    playerCards.append(newCard)
    shuffledDeck.shift()
    console.log(playerHand)
    console.log(shuffledDeck)
}

// Stand
function endTurn() {
    standBtn.disabled = true
    hitBtn.disabled = true
    turn = false
    // calculates how many aces are in the dealers hand
    let aces = 0
    dealerHand.forEach(card => {
        if (card.face[1] === 'A') {
            aces += 1
        }
    })
    //calculates the value of the cards in the dealer's hand
    let dealerScore = calcHandValues(dealerHand)
    console.log(dealerScore)
    // while the dealers score is either less than or equal to 16, or 17 with an Ace in their hand (soft 17), add another card to their hand.
    while (dealerScore <= 16 || (dealerScore < 22 && dealerScore === 17 && aces)) {
        dealerHand.push(shuffledDeck[0])
        dealerScore = calcHandValues(dealerHand)
        let card = document.createElement('div')
        card.classList.add('card', dealerHand[dealerHand.length - 1].face)
        dealerCards.append(card)
        shuffledDeck.shift()
        //break if their hand value totals to 21, or surpasses 21 - bust
        if (dealerScore >= 21) {
            break
        }
        console.log(dealerScore)
    }
    checkWinner()
}

function render() {
    renderCards()
    renderScores()
    renderTotals()
    renderMessages()
}

// INCOMPLETE, i think?
function renderTotals() {
    let playerScore = calcHandValues(playerHand)
    let dealerScore = calcHandValues(dealerHand)
    document.getElementById('p-total').innerText = `Total: ${playerScore}`
    document.getElementById('d-total').innerText = `Total: ${dealerScore}`
}

// function renderCards() {
//     const bothHands = [playerHand, dealerHand]
//     bothHands.forEach(hand => {
//         hand.forEach(card => {
//             let newCard = document.createElement('div')
//             newCard.classList.add('card', card.face)
//             hand === playerHand ? playerCards.append(newCard) : dealerCards.append(newCard)
//         })
//     })
// }

function renderCards() {
    playerHand.forEach(card => {
        let newCard = document.createElement('div')
        newCard.classList.add('card', card.face)
        playerCards.append(newCard)
    })
    dealerHand.forEach(card => {
        let newCard = document.createElement('div')
        newCard.classList.add('card', card.face)
        dealerCards.append(newCard)
        let firstCard = document.querySelector('#d-cards > div')
        firstCard.classList.add('back-blue')
    })
}

function renderScores() {

}

function renderMessages() {

}