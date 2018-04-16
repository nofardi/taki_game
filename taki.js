var colorsEnum = {
    "Green": 1,
    "Yellow": 2,
    "Red": 3,
    "Blue": 4,
};

var valuesEnum = {
    // numbers
    'ONE': 1,
    'THREE': 3,
    'FOUR': 4,
    'FIVE': 5,
    'SIX': 6,
    'SEVEN': 7,
    'EIGHT': 8,
    'NINE': 9,

    // special cards
    'TAKI': 10,
    'STOP': 11,
    'CHANGE_COLOR': 12,
};

var playerTypeEnum = {
    Human: 1,
    Computer: 2,
};
var gameTypeEnum = {
    PVC: 1,
};

var player = {
    cards: [],
    isComputer: false,
    currentAmountOfCards: 0
};

function game() {

}

function card(value, color) {
    var value = value;
    var color = color;

    function printValue() {
        console.log(value);
    }

    function printColor() {
        console.log(color);
    }

    this.getValue = function () {
        return value;
    };
    this.getColor = function () {
        return color;
    }
}
function createDeck() {

    var numOfCardsReturn = 2;
    var deck = [];
    for (var cardValue = 0; cardValue < valuesEnum.length; cardValue++) {
        for (var color = 0; color < colorsEnum.length; color++) { //
            for (var returnIndex = 0; returnIndex < numOfCardsReturn; returnIndex++) { //two of each card.
                var specialValue = parseInt(valuesEnum[cardValue]);
                specialValue =
                    valuesEnum[cardValue] == "Taki" ||
                    valuesEnum[cardValue] == "Stop" ||
                    valuesEnum[cardValue] == "ChangeColor";
                var card = {Value: valuesEnum[cardValue], Color: colorsEnum[color], IsWildCard: specialValue};
                deck.push(card);
            }
        }
    }
}

function deliverCards(amount, player) {
    for (var i = 0; i < amount; i++) {
        player.cards.push(deck.pop());
        player.currentAmountOfCards++;
    }
}

function createPlayers(numOfPlayers, gameType) {
    players = [];
    for (var playerIndex = 0; playerIndex < numOfPlayers; playerIndex++) {
        var hand = [];
        var player = {
            Name: 'Player ' + playerIndex,
            ID: playerIndex,
            Points: 0,
            Hand: hand,
            PlayerType: null
        };
        players.push(player);
    }

    initPlayersType(gameType);

}

function initPlayersType(gameType) {
    players[0].playerType = playerTypeEnum.Human;

    if (gameType == gameTypeEnum.PVC) {// Player vs Computer

        // init the rest of the players to Computer.
        for (var playerIndex = 1; playerIndex < numOfPlayers; playerIndex++) {
            players[playerIndex].playerType = playerTypeEnum.Computer;
        }
    }
    else {                       // Player vs Players.

        for (var playerIndex = 1; playerIndex < numOfPlayers; playerIndex++) {
            players[playerIndex].playerType = playerTypeEnum.Human;
        }
    }
}

//  Fisher-Yates shuffle
function shuffle(deck) {
    var i;
    var j = 0;
    var temp = null;

    for (i = deck.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function dealHands() {
    var startingNumberOfCards = 8;
    // alternate handing cards to each player
    for (var i = 0; i < startingNumberOfCards; i++) {
        for (var playerIndex = 0; playerIndex < players.length; playerIndex++) {
            var card = deck.pop();
            players[playerIndex].Hand.push(card);
            renderCard(card, playerIndex);
            // updatePoints();
        }
    }

    updateDeck();
}

function exit_button_clicked() {
    alert("You've exited the game!");
}

