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

var players=[];
var deck=[];

function initGame(){
    var numOfPlayers=2;
    var continuePlaying=true;
    while(!continuePlaying)
    {
        newGame(numOfPlayers);
    }

}

function newGame(numOfPlayers) {
    var gameFinished=false;
    createDeck(); // create the deck and shuffle.
    createPlayers(numOfPlayers,gameTypeEnum.PVC); // create the players and deal them.
    while(!gameFinished)
    {
        gameFinished= newRound();
    }
};

function newRound() {
    var gameFinished=false;

    var currentPlayerIndex;
    for(currentPlayerIndex=0;currentPlayerIndex< players.length || !gameFinished;currentPlayerIndex++)
    {

        players[currentPlayerIndex].playTurn();

    }
}



function card(value, color,isWildCard) {
    var value = value;
    var color = color;
    var isWildCard=isWildCard; // bool

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

    this.isWildCard = function () {
        return isWildCard;
    }
}

function createDeck() {
    var numOfCardsReturn = 2;
    for (var cardValue = 0; cardValue < valuesEnum.length; cardValue++) {
        for (var color = 0; color < colorsEnum.length; color++) { //
            for (var returnIndex = 0; returnIndex < numOfCardsReturn; returnIndex++) { //two of each card.
                var isWildCard = parseInt(valuesEnum[cardValue]);
                isWildCard =
                    valuesEnum[cardValue] == "Taki" ||
                    valuesEnum[cardValue] == "Stop" ||
                    valuesEnum[cardValue] == "ChangeColor";
                var card = new card(valuesEnum[cardValue], colorsEnum[color],isWildCard);
                deck.push(card);
            }
        }
    }

    shuffle(deck);
}
function player(name,isComputer,ID,Points,Hand,PlayerType,CurrentAmountOfCards)
{
    var name=name;
    var isComputer=isComputer;
    var ID=ID;
    var points=Points;
    var hand=Hand;
    var playerType=PlayerType;
    var currentAmountOfCards=CurrentAmountOfCards;

    this.getPoints =function () {
        return
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


function createPlayers(numOfPlayers, gameType) {
    for (var playerIndex = 0; playerIndex < numOfPlayers; playerIndex++) {
        var hand = [];
        var player = {
            Name: 'Player ' + playerIndex,
            isComputer: false,
            ID: playerIndex,
            Points: 0,
            Hand: hand,
            PlayerType: null,
            currentAmountOfCards: 0,
        };
        dealHands(player);
        players.push(player);
    }

    initPlayersType(gameType,numOfPlayers);
}
function dealHands(player) {
    var initialCardAmountToPlayer=8;
    for (var i = 0; i < initialCardAmountToPlayer; i++) {
        player.hand.push(deck.pop());
        player.currentAmountOfCards++;
    }
}
function initPlayersType(gameType,numOfPlayers) {
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


function exit_button_clicked() {
    alert("You've exited the game!");
}

