/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
// Wins count does not reset with reset button
const wins = {
    player: 0,
    dealer: 0
}

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
const winnerMsg = document.querySelector('h2')
const dealCardsBtn = document.getElementById('deal')
const standBtn = document.getElementById('stand')
const hitBtn = document.getElementById('hit')
const deckBtn = document.getElementById('deck')
const resetBtn = document.getElementById('reset')

/*----- event listeners -----*/
resetBtn.addEventListener('click', resetGame)
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
        playerHand.push(shuffledDeck.shift())
        dealerHand.push(shuffledDeck.shift())
    }
    checkWinner()
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
}

function checkWinner() {
    let playerScore = calcHandValues(playerHand)
    let dealerScore = calcHandValues(dealerHand)
    if (turn) {
        if (playerScore === 21 && playerHand.length === 2) {
            if (dealerScore === 21 && dealerHand.length === 2) {
                winner = "push"
            } else {
                winner = 'player blackjack'
                wins.player += 1
            }
        } else if (dealerScore === 21 && dealerHand.length === 2) {
            winner = 'dealer blackjack'
            wins.dealer += 1
        } 
        if (playerScore > 21) {
            winner = 'bust dealer wins'
            wins.dealer += 1
        }
    } else {
        if (dealerScore > 21) {
            winner = 'bust player wins'
            wins.player += 1
        } else if (playerScore > dealerScore && playerScore <= 21) {
            winner = 'player'
            wins.player += 1
        }
        if (dealerScore > playerScore && dealerScore <= 21) {
            winner = 'dealer'
            wins.dealer += 1
        }
        if (playerScore === dealerScore) {
            winner = 'push'
        }
    }    
    render() 
}

function resetGame() {
    while (playerCards.firstChild) {
        playerCards.removeChild(playerCards.lastChild)
    }
    while (dealerCards.firstChild) {
        dealerCards.removeChild(dealerCards.lastChild)
    }
    init()
}

// Hit
function addCard() {
    playerHand.push(shuffledDeck.shift())
    let newCard = document.createElement('div')
    playerCards.append(newCard)
    checkWinner()
    render()
}

// Stand
function endTurn() {
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
    // while the dealers score is either less than or equal to 16, or 17 with an Ace in their hand (soft 17), add another card to their hand.
    while (dealerScore <= 16 || (dealerScore === 17 && aces)) {
        dealerHand.push(shuffledDeck.shift())
        dealerScore = calcHandValues(dealerHand)
        let card = document.createElement('div')
        card.classList.add('card', dealerHand[dealerHand.length - 1].face)
        dealerCards.append(card)
        //break if their hand value totals to 21, or surpasses 21 - bust
        if (dealerScore >= 21) {
            break
        }
    }
    checkWinner()
}

function render() {
    renderCards()
    renderScores()
    renderControls()
    renderTotals()
    renderMessages()
}

function renderTotals() {
    let playerScore = calcHandValues(playerHand)
    let dealerScore = calcHandValues(dealerHand)
    if (!dealCardsBtn.disabled) {
        document.getElementById('d-total').innerText = 'Total: 0'
    } else if (!winner) {
        document.getElementById('d-total').innerText = 'Total: ?'
    } else {
        document.getElementById('d-total').innerText = `Total: ${dealerScore}`
    }
    document.getElementById('p-total').innerText = `Total: ${playerScore}`
}

function renderCards() {
    playerCards.innerHTML = ''
    dealerCards.innerHTML = ''
        playerHand.forEach(card => {
            let newCard = document.createElement('div')
            newCard.classList.add('card', 'xlarge', card.face)
            playerCards.append(newCard)
        })
        dealerHand.forEach(card => {
            let newCard = document.createElement('div')
            newCard.classList.add('card', 'xlarge', card.face)
            dealerCards.append(newCard)
            let firstCard = document.querySelector('#d-cards > div')
            firstCard.classList.add('back-blue')
        })
        if (!turn || winner) {
            let flippedCard = document.getElementsByClassName('back-blue')
            flippedCard[0].classList.remove('back-blue')
        }
}

function renderControls() {
    if (!turn || winner) {
        standBtn.disabled = true
        hitBtn.disabled = true
    } else {
        standBtn.disabled = false
        hitBtn.disabled = false
    }
    if (playerHand.length !== 0) {
        dealCardsBtn.disabled = true
        deckBtn.removeEventListener('click', dealCards)
    } else {
        dealCardsBtn.disabled = false
        deckBtn.addEventListener('click', dealCards)
    }
    if (!winner) {
        resetBtn.disabled = true
    } else {
        resetBtn.disabled = false
    }
}

function renderScores() {
    scores.innerHTML = `Player: ${wins.player} <br><br> Dealer: ${wins.dealer}`
}

function renderMessages() {
    switch (winner) {
        case 'player blackjack':
            winnerMsg.innerText = 'Player Wins with Blackjack!'
            break
        case 'dealer blackjack':
            winnerMsg.innerText = 'Dealer Wins with Blackjack!'
            break
        case 'bust dealer wins':
            winnerMsg.innerText = 'Bust! Dealer Wins'
            break
        case 'bust player wins':
            winnerMsg.innerText = 'Bust! Player Wins'
            break
        case 'player':
            winnerMsg.innerText = 'Player Wins!'
            break
        case 'dealer':
            winnerMsg.innerText = 'Dealer Wins!'
            break
        case 'push':
            winnerMsg.innerText = 'Push ):'
            break
        default: 
        // do nothing - game in progress
        break
    }
    if (!winner) {
        winnerMsg.innerText = ''
    }
}