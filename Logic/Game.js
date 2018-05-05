var Game = (function () {
    var currentPlayerIndex = 0;
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
        Deck.initDiscardDeck();
        uiModule.populateDeck();
        dealHands();
        Card.prototype.playable = true; // todo: move to card?

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


    function playTurn(elem) {
        var topDiscardPileCard = Deck.top();
        if((currentPlayerIndex + 1) != tryParseInt(uiModule.getClickedPlayerParentOfElem(elem))) {
            uiModule.invalidCardChoicePrompt();
        }

        else if (players[currentPlayerIndex].isStopped) {     // check and handle if last card was 'STOP'.
            handleStopCard();
        }
        else {
            // update cards status.
            players[currentPlayerIndex].hasPlayableHand = updateCardsStatus(topDiscardPileCard, players[currentPlayerIndex].hand);
            // check if any cards are playable.
            if (playerTypeEnum.Human === players[currentPlayerIndex].playerType) {
                handleHumanMove(players[currentPlayerIndex], elem);
            }
            else {
                handleComputerMove(players[currentPlayerIndex]);
            }
        }


        // makeMove(player, move);
        // checkWin();
        // updateComponents();


        function getSelectedCardFromUser(elem) {
            var value = elem.getAttribute("cardValue");
            var card = new Card(tryParseInt(elem.getAttribute("cardValue"), elem.getAttribute("cardValue")), elem.getAttribute("cardColor"),(elem.getAttribute("isWild") == "true"));
            return card;
        }

        function tryParseInt(str, defaultValue) {
            var retValue = defaultValue;
             if(str !== null) {
                 if(str.length > 0) {
                     if (!isNaN(str)) {
                         retValue = parseInt(str);
                     }
                 }
             }
             return retValue;
        }

        function handleStopCard() {
            if (players[currentPlayerIndex].isStopped === false) { // current player was stopped.
                players[currentPlayerIndex].isStopped = true;
                changeToOtherPlayerIndex();
            }
            else { // current player turn.
                players[currentPlayerIndex].isStopped = false;
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
                else if ((card.value === card.cardTypeEnum.CHANGE_COLOR) && (card.color === topDiscardPileCard.color)) {
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

        function handleHumanMove(player, elem) {
            var selectedCard;

            if (player.hasPlayableHand) {
                var legalMove = false;

                selectedCard = getSelectedCardFromUser(elem);
                legalMove = isLegalMove(player, selectedCard);
                if(!legalMove) {
                    uiModule.invalidCardChoicePrompt();
                    return;
                }
                
                var cardIndex = player.discardCard(selectedCard);
                Deck.discardPile.push(selectedCard);
                players[currentPlayerIndex].hand.splice(cardIndex, 1);
                uiModule.removeCardAtIndex(currentPlayerIndex, cardIndex);
                handleAdditionalCards(player, selectedCard);
            }
            else {
                //todo: bold the draw pile and wait for player to draw.
                Deck.drawCard(player.hand);
            }
        }

        function handleComputerMove(player) {
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
            switch(selectedCard.value) {
                case Deck.coloredWildCardsEnum.taki:
                    //run turn of player until out of same color cards\ wishes to pass turn
                    break;
                case Deck.colorlessWildCardsEnum.changeColor:
                    //todo: ask user to choose color and update the pack of the new color
                    var newColor = uiModule.changeColorPrompt();
                    changeToOtherPlayerIndex();
                    break;
                default:
                    changeToOtherPlayerIndex();
                    break;
            }
        }

        function changeToOtherPlayerIndex() {
            uiModule.disablePlayerCards(currentPlayerIndex);
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            uiModule.enablePlayerCards(currentPlayerIndex);
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
            Deck.createCards();
            createPlayers(numOfPlayers, gameTypeEnum.PVC);
            initRound();
        },
        playRound: function(elem) {
            playTurn(elem);
        
        }
    }

})();

function startGame() {
    Game.initGame(2);
}

