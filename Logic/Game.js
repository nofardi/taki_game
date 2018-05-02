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

    function newRound() {
        var gameFinished = false;
        Deck.resetDeck();
        Deck.initDiscardDeck();
        Deck.shuffle(Deck.drawPile);
        uiModule.populateDeck();
        dealHands();
        Card.prototype.playable = true;
        currentPlayerIndex = 0;
        function dealHands() {
            var initialCardAmountToPlayer = 8;
            for (var playerIndex = 0; playerIndex < players.length; playerIndex++) {
                for (var i = 0; i < initialCardAmountToPlayer; i++) {
                    players[playerIndex].hand.push(Deck.drawPile.pop());
                    //todo: ui card movement.
                    players[playerIndex].currentAmountOfCards++;
                }
            }

            uiModule.dealHandsToPlayers(players);
        }
    }

    function playTurn(player, elem) {
        var topDiscardPileCard = Deck.top();
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
                    isTurnFinished = handleHumanMove(player, elem);
                }
            }
            else {
                while(!isTurnFinished) {
                    isTurnFinished = handleComputerMove(player);
                }
            }
        }


        // makeMove(player, move);
        // checkWin();
        // updateComponents();

        function getSelectedCardFromUser(elem) {

            var card = Card(elem.getAttribute("value"), elem.getAttribute("color"),elem.getAttribute("isWild") , elem.getAttribute("cardType"));
            return card;
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

        function handleHumanMove(player, elem) {
            var selectedCard;

            if (player.hasPlayableHand) {
                var legalMove = false;

                while (!legalMove) {
                    selectedCard = getSelectedCardFromUser(elem);
                    legalMove = isLegalMove(player, selectedCard);
                    //todo: notify ui.
                }
                player.discardCard(selectedCard);
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
            switch(selectedCard.cardType) {
                case Card.cardTypeEnum.TAKI:
                    //run turn of player until out of same color cards\ wishes to pass turn
                    break;
                case Card.cardTypeEnum.PLUS:
                    playTurn(player);
                    break;
                case Card.cardTypeEnum.CHANGE_COLOR:
                    //todo: ask user to choose color and update the pack of the new color
                    break;
                default:
                    break;
            }
        }

        function getSelectedCardFromPlayableHand(player) {
            var playableCard;
            player.hand.forEach(card => {
                if(card.playable) {
                    playableCard = card;
                    break;
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

            // game loop
            // while (continuePlaying) {
            newRound();
            // }
        },

        playRound: function(elem) {
            playTurn(players[currentPlayerIndex], elem);
        
        }


    }

})();

function startGame() {
    Game.initGame(2);
}

