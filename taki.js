var playerTypeEnum = {
    Human: 1,
    Computer: 2,
};
var gameTypeEnum = {
    PVC: 1,
};


var PlayersContainer = (function () {
    var numOfPlayers = 2;
    var players = [];
    return {
        numOfPlayers: numOfPlayers,
        players: players,
        createPlayers: function (numOfPlayers, gameType) {
            for (var playerIndex = 0; playerIndex < numOfPlayers; playerIndex++) {
                var hand = [];
                var player = new Player('Player ' + playerIndex, false, playerIndex, 0, hand, null, 0);
                players.push(player);
            }
            this.initPlayersType(gameType, numOfPlayers);
            // populatePlayers(players);

            return players;
        },

        dealHands: function (player) {
            var initialCardAmountToPlayer = 8;
            for (var i = 0; i < initialCardAmountToPlayer; i++) {
                player.hand.push(DeckContainer.drawPile.pop());
                player.currentAmountOfCards++;
            }
        },

        initPlayersType: function (gameType, numOfPlayers) {
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
        },

        playTurn: function (player) {

            if (playerTypeEnum.Human == player.playerType) {
                var legalMove = false;
                var userMove;
                while (!legalMove) {
                    userMove = getUserMove();
                    //todo:  check if player quit.
                    legalMove = isLegalMove(userMove);
                }
            }
            else {
                getComputerMove();
            }

            updateComponents();
            checkWin();
        },
    }
})();
// deck.js
var DeckContainer = (function () {
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
    var drawPile, discardPile;

    return {
        discardPile: discardPile = [],
        drawPile: drawPile = [],
        numOfCardsInDrawPile: drawPile.length,
        numOfCardsInDiscardPile: discardPile.length,
        createCards: function () {
            var numOfCardsReturn = 2;
            for (var cardValue = 0; cardValue < valuesEnum.length; cardValue++) {
                for (var color = 0; color < colorsEnum.length; color++) { //
                    for (var returnIndex = 0; returnIndex < numOfCardsReturn; returnIndex++) { //two of each card.
                        var isWildCard = parseInt(valuesEnum[cardValue]);
                        isWildCard =
                            valuesEnum[cardValue] == "Taki" ||
                            valuesEnum[cardValue] == "Stop" ||
                            valuesEnum[cardValue] == "ChangeColor";
                        var card = new Card(valuesEnum[cardValue], colorsEnum[color], isWildCard);
                        drawPile.push(card);
                    }
                }
            }
        },
        shuffle: function (pileToShuffle) {
            //  Fisher-Yates shuffle
            var i;
            var j = 0;
            var temp = null;

            for (i = pileToShuffle.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1));
                temp = pileToShuffle[i];
                pileToShuffle[i] = pileToShuffle[j];
                pileToShuffle[j] = temp;
            }
        },

    }
})();

// taki.js

function initGame() {
    var continuePlaying = true;
    DeckContainer.createCards();
    PlayersContainer.createPlayers(PlayersContainer.numOfPlayers, gameTypeEnum.PVC);

    while (!continuePlaying) {
        newRound();
    }
}

function newRound() {
    var gameFinished = false;
    DeckContainer.shuffle(DeckContainer.drawPile);
    PlayersContainer.dealHands();


    while (!gameFinished) {
        for (var currentPlayerIndex = 0; currentPlayerIndex < PlayersContainer.numOfPlayers.length; currentPlayerIndex++) {
            PlayersContainer.players[currentPlayerIndex].playTurn();
        }
    }
    showStatistics();

}


// card.js
function Card(value, color, isWildCard) {
    this.value = value;
    this.color = color;
    this.isWildCard = isWildCard;

    this.info = function () {
        alert('The card info is: ' + this.value + ' ' + this.color + ' ' + this.isWildCard);
    }
}

// player.js
function Player(name, isComputer, ID, score, Hand, PlayerType, CurrentAmountOfCards) {
    this.name = name;
    this.isComputer = isComputer;
    this.ID = ID;
    this.score = score;
    this.hand = Hand;
    this.playerType = PlayerType;
    this.currentAmountOfCards = CurrentAmountOfCards;
}

this.// UI functions
    function
populatePlayers(players)
{

}



