const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardsChosen = [];
let cardsChosenId = [];
let cardsMatched = [];
let timeLeft = 60; // Initial time limit
let level = 1; // Initial level
let timerId;

// Function to start the countdown timer based on level
function startTimer() {
    const timeLimits = [60, 50, 40, 30]; // Time limits for each level (in seconds)
    timeLeft = timeLimits[level - 1]; // Set time limit based on current level
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('time-left').textContent = timeLeft;
        } else {
            clearInterval(timerId);
            endGame();
        }
    }, 1000);
}

// Function to end the game when time is up
function endGame() {
    alert('Time is up! Game Over!');
    resetGame();
}

// Function to shuffle the cards array
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create game board
function createBoard() {
    shuffleCards(cardsArray);
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

// Function to flip card
function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardsArray[cardId]);
    cardsChosenId.push(cardId);
    this.textContent = cardsArray[cardId];
    this.classList.add('selected');
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

// Function to check for card match
function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCardId, secondCardId] = cardsChosenId;
    const [firstCard, secondCard] = cardsChosen;
    if (firstCard === secondCard) {
        cards[firstCardId].classList.add('matched');
        cards[secondCardId].classList.add('matched');
        cardsMatched.push(cardsChosen);
    } else {
        cards[firstCardId].textContent = '';
        cards[secondCardId].textContent = '';
    }
    cardsChosen = [];
    cardsChosenId = [];
    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === cardsArray.length) {
        clearInterval(timerId); // Stop the timer when all cards are matched
        if (level < 4) {
            level++; // Increase level if not at maximum level
            alert(`Level ${level} unlocked!`);
        }
        alert('Congratulations! You have matched all the cards!');
        resetGame();
    }
}

// Function to reset game
function resetGame() {
    clearInterval(timerId); // Stop the timer
    level = 1; // Reset level
    document.getElementById('time-left').textContent = ''; // Reset timer display
    grid.innerHTML = ''; // Clear game grid
    cardsChosen = []; // Reset arrays
    cardsChosenId = [];
    cardsMatched = [];
    document.getElementById('level-selection').classList.remove('hidden'); // Show level selection
    document.getElementById('game-container').classList.add('hidden'); // Hide game container
}

// Function to start the game
function startGame() {
    level = parseInt(document.getElementById('level').value); // Get selected level
    document.getElementById('level-selection').classList.add('hidden'); // Hide level selection
    document.getElementById('game-container').classList.remove('hidden'); // Show game container
    createBoard(); // Start the game
    startTimer(); // Start the timer
}

const grid = document.getElementById('game-grid');
