window.addEventListener("load", initializeGame, false);

function initializeGame() {
    var gameGrid = document.getElementById('gameGrid');
    var attemptsDisplay = document.getElementById('attempts');
    var messageDisplay = document.getElementById('message');
    var resetButton = document.getElementById('resetButton');

    var images = [
        "img1.png", "img2.png", "img3.png",
        "img4.png", "img5.png", "img6.png"
    ];

    var cardsArray = [];
    var flippedCards = [];
    var matchedPairs = 0;
    var attempts = 0;
    var lockBoard = false;
    
    function resetGame() {
        cardsArray = [];
        for (var i = 0; i < images.length; i++) {
            cardsArray.push(images[i]);
            cardsArray.push(images[i]);
        }
        
        shuffleCards();
        createBoard();

        attempts = 0;
        matchedPairs = 0;
        attemptsDisplay.innerHTML = attempts;
        messageDisplay.innerHTML = '';
        flippedCards = [];
        lockBoard = false;
    }

    function shuffleCards() {
        for (var i = cardsArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            
            var temp = cardsArray[i];
            cardsArray[i] = cardsArray[j];
            cardsArray[j] = temp;
        }
    }

    function createBoard() {
        gameGrid.innerHTML = '';
        for (var i = 0; i < cardsArray.length; i++) {
            var src = cardsArray[i];
            var card = document.createElement('div');
            card.className = 'card'; 
            card.setAttribute('data-src', src);

            var backFace = document.createElement('div');
            backFace.className = 'back-face';
            backFace.innerHTML = '?';

            var frontFace = document.createElement('div');
            frontFace.className = 'front-face';
            var img = document.createElement('img');
            img.src = src;
            img.alt = "Карта";
            frontFace.appendChild(img);

            card.appendChild(backFace);
            card.appendChild(frontFace);

            card.addEventListener('click', flipCard, false);
            gameGrid.appendChild(card);
        }
    }

    function flipCard() {
        if (lockBoard || this.className.indexOf('flipped') > -1) {
            return;
        }

        this.className += ' flipped'; 
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            attempts++;
            attemptsDisplay.innerHTML = attempts;
            lockBoard = true;
            checkForMatch();
        }
    }

    function checkForMatch() {
        var cardOne = flippedCards[0];
        var cardTwo = flippedCards[1];
        
        var isMatch = cardOne.getAttribute('data-src') === cardTwo.getAttribute('data-src');
        
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        flippedCards[0].className += ' matched';
        flippedCards[1].className += ' matched';

        matchedPairs++;
        resetBoard();
        checkWin();
    }

    function unflipCards() {
        setTimeout(function() {
            flippedCards[0].className = flippedCards[0].className.replace(' flipped', '');
            flippedCards[1].className = flippedCards[1].className.replace(' flipped', '');
            resetBoard();
        }, 1000);
    }
    
    function resetBoard() {
        flippedCards = [];
        lockBoard = false;
    }

    function checkWin() {
        if (matchedPairs === images.length) {
            messageDisplay.innerHTML = 'Браво! Ги најде сите парови за ' + attempts + ' обиди.';
        }
    }
    
    resetButton.addEventListener('click', resetGame, false);
    
    resetGame();
}