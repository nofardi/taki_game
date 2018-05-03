var Game = (function () {
    var playerTypeEnum = {
        Human: 1,
        Computer: 2
    };
    var gameTypeEnum = {
        PVC: 1
    };
    var players = [];

    function createPlayers(numOfPlayers, gameType) {
        for (var playerIndex = 0; playerIndex < numOfPlayers; playerIndex++) {
            var hand = [];
            var player = new Player('Player ' + playerIndex, false, playerIndex, 0, hand, null, 0);
            players.push(player);
        }
        initPlayersType(gameType, numOfPlayers);
        console.log("Created "+numOfPlayers + "players.")

        uiModule.populatePlayers(players);
    }

    function initPlayersType(gameType) {
        players[0].playerType = playerTypeEnum.Human;
        var playerIndex;
        if (gameType === gameTypeEnum.PVC) { // Player vs Computer

            // init the rest of the players to Computer.
            for (playerIndex = 1; playerIndex < players.length; playerIndex++) {
                players[playerIndex].playerType = playerTypeEnum.Computer;
            }
        } else { // Player vs Players.

            for (playerIndex = 1; playerIndex < players.length; playerIndex++) {
                players[playerIndex].playerType = playerTypeEnum.Human;
            }
        }
    }

    function initRound() {
        // var gameFinished = false;
        Deck.resetDeck();
        Deck.shuffle(Deck.drawPile);
        uiModule.populateDeck();
        dealHands();
        Card.prototype.playable = true;

        // while (!gameFinished ) {
        //     for (var currentPlayerIndex = 0; currentPlayerIndex < players.length; currentPlayerIndex++) {
        //         playTurn(players[currentPlayerIndex]);
        //     }
        // }
        // WebHandler.showStatistics();
        function dealHands() {
            var initialCardAmountToPlayer = 8;
            for (var playerIndex = 0; playerIndex < players.length; playerIndex++) {
                for (var i = 0; i < initialCardAmountToPlayer; i++) {
                    players[playerIndex].hand.push(Deck.drawPile.pop());
                    players[playerIndex].currentAmountOfCards++;
                }
            }
            //todo: ui card movement.
            uiModule.dealHandsToPlayers(players);
        }
    }


    function playTurn(player) {
        var topDiscardPileCard = Deck.discardPile.top();
        var isTurnFinished = false;
        if (player.isStopped) {     // check and handle if last card was 'STOP'.
            handleStopCard();
        }
        else {
            // update cards status.
            player.hasPlayableHand = updateCardsStatus(topDiscardPileCard, player.hand);
            // check if any cards are playable.
            if (playerTypeEnum.Human === player.playerType) {
                while(!isTurnFinished) {
                    isTurnFinished = handleHumanMove();
                }
            }
            else {
                while(!isTurnFinished) {
                    isTurnFinished = handleComputerMove();
                }
            }
        }


        // makeMove(player, move);
        // checkWin();
        // updateComponents();

<<<<<<< HEAD
        function getSelectedCardFromUser() {
            //todo: get the user choice from the ui.
            // move= askUI();
=======
        function getSelectedCardFromUser(elem) {

            var card = new Card(elem.getAttribute("cardValue"), elem.getAttribute("cardColor"),elem.getAttribute("isWild"));
            return card;
>>>>>>> 4a3fcccaff413bce932c19a1e4a15e11f9f44148
        }

        function handleStopCard() {
            if (players[(player.playerIndex - 1) % players.length].isStopped === false) { // current player was stopped.
                player.isStopped = true;
                //TODO: skip turn if not skipped already.
            }
            else { // current player turn.
                players[(player.playerIndex - 1) % players.length].isStopped = false;
            }
        }

        function updateCardsStatus(topDiscardPileCard, hand) {
            var hasPlayableHand = false;
            hand.forEach(card => {
                /*
                a. top to each hand card color comparison ( including wild cards )
                b. top to each hand card value comparison
                c. colorless card
                */
                if (card.value === topDiscardPileCard.value) {
                    card.playable = hasPlayableHand = true;
                }
                else if (card.color === topDiscardPileCard.color) {
                    card.playable = hasPlayableHand = true;
                }
                else if (card.value === card.cardTypeEnum.CHANGE_COLOR) {
                    card.playable = hasPlayableHand = true;
                }
                else {
                    card.playable = false;
                }
            })
            return hasPlayableHand;
        }

        function makeMove(player, selectedCard) {
            Deck.discardPile.push(selectedCard);
        }

        function handleHumanMove() {
            var selectedCard;

            if (player.hasPlayableHand) {
                var legalMove = false;

                while (!legalMove) {
                    selectedCard = getSelectedCardFromUser();
                    legalMove = isLegalMove(player, selectedCard);
                    if(!legalMove) {
                        uiModule.invalidCardChoicePrompt();
                    }
                }
                player.discardCard(selectedCard);
                handleAdditionalCards(player, selectedCard);
            }
            else {
                //todo: bold the draw pile and wait for player to draw.
                Deck.drawCard(player.hand);
            }
        }

        function handleComputerMove() {
            var selectedCard;
            if(player.hasPlayableHand) {
                selectedCard = getSelectedCardFromPlayableHand(player);
                player.discardCard(selectedCard);
                handleAdditionalCards(player, selectedCard);
            }
            else {
                Deck.drawCard(player.hand)
            }
        }

        function handleAdditionalCards(player, selectedCard) {
            switch(selectedCard.cardValue) {
                case Deck.coloredWildCardsEnum.taki:
                    //run turn of player until out of same color cards\ wishes to pass turn
                    break;
                case Card.colorlessWildCardsEnum.changeColor:
                    //todo: ask user to choose color and update the pack of the new color
                    uiModule.changeColorPrompt()
                    break;
                default:
                    changeToOtherPlayerIndex()
                    break;
            }
        }

        function changeToOtherPlayerIndex() {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

        }

        function getSelectedCardFromPlayableHand(player) {
            var playableCard;
            player.hand.forEach(card => {
                if(card.playable) {
                    playableCard = card;
                }
            })
            return playableCard;
        }

        function isLegalMove(player, selectedCard) {
            var legalMove = false;
            if (selectedCard.playable) {
                legalMove = true;
            }

            return legalMove;
        }
        
    }


    return {
        players: players,
        initGame: function (numOfPlayers) {
            // init components.
            var continuePlaying = true;
            Deck.createCards();
            createPlayers(numOfPlayers, gameTypeEnum.PVC);
            initRound();
        }


    }

})();

function startGame() {
    Game.initGame(2);
}

