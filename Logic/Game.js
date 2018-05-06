var playerTypeEnum = {
    Human: 1,
    Computer: 2
};
var gameTypeEnum = {
    PVC: 1
};

function Game(numOfPlayers, players, gameType) {
    // ctor
    var currentPlayerIndex = 0;
    var m_Deck = Deck();
    var m_Players = players;
    initRound();


    function initRound() {
        dealHands();
        Card.prototype.playable = true; // todo: move to card?

        // move top card of drawPile to DiscardPile.
        m_Deck.discardPile.push(m_Deck.drawPile.pop());

        function dealHands() {
            var initialCardAmountToPlayer = 8;
            for (var playerIndex = 0; playerIndex < m_Players.length; playerIndex++) {
                for (var i = 0; i < initialCardAmountToPlayer; i++) {
                    m_Players[playerIndex].hand.push(m_Deck.drawPile.pop());
                    m_Players[playerIndex].currentAmountOfCards++;
                }
            }
        }
    }

    function playTurn(elem) {
        var topCardOnDiscardPile = Deck.top();
        if ((currentPlayerIndex + 1) != tryParseInt(uiModule.getClickedPlayerParentOfElem(elem))) {
            uiModule.invalidCardChoicePrompt();
        }

        else if (m_Players[currentPlayerIndex].isStopped) {     // check and handle if last card was 'STOP'.
            handleStopCard();
        }
        else {
            // update cards status.
            m_Players[currentPlayerIndex].hasPlayableHand = updateCardsStatus(topCardOnDiscardPile, m_Players[currentPlayerIndex].hand);
            // check if any cards are playable.
            if (playerTypeEnum.Human === m_Players[currentPlayerIndex].playerType) {
                handleHumanMove(m_Players[currentPlayerIndex], elem);
            }
            else {
                handleComputerMove(m_Players[currentPlayerIndex]);
            }
        }


        // makeMove(player, move);
        // checkWin();
        // updateComponents();


        function getSelectedCardFromUser(elem) {

        }


        function handleStopCard() {
            if (m_Players[currentPlayerIndex].isStopped === false) { // current player was stopped.
                m_Players[currentPlayerIndex].isStopped = true;
                changeToOtherPlayerIndex();
            }
            else { // current player turn.
                m_Players[currentPlayerIndex].isStopped = false;
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
                if (!legalMove) {
                    uiModule.invalidCardChoicePrompt();
                    return;
                }

                var cardIndex = player.discardCard(selectedCard);
                Deck.discardPile.push(selectedCard);
                m_Players[currentPlayerIndex].hand.splice(cardIndex, 1);
                uiModule.removeCardAtIndex(currentPlayerIndex, cardIndex);
                handleAdditionalCards(player, selectedCard);
            }
            else {
                //todo: bold the draw pile and wait for player to draw.
                uiModule.boldDrawPile();
                Deck.drawCard(player.hand);
            }
        }

        function handleComputerMove(player) {
            var selectedCard;
            if (player.hasPlayableHand) {
                selectedCard = getSelectedCardFromPlayableHand(player);
                player.discardCard(selectedCard);
                handleAdditionalCards(player, selectedCard);
            }
            else {
                Deck.drawCard(player.hand)
            }
        }

        function handleAdditionalCards(player, selectedCard) {
            switch (selectedCard.value) {
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
            //    uiModule.disablePlayerCards(currentPlayerIndex);
            currentPlayerIndex = (currentPlayerIndex + 1) % m_Players.length;
            //    uiModule.enablePlayerCards(currentPlayerIndex);
        }

        function getSelectedCardFromPlayableHand(player) {
            var playableCard;
            player.hand.forEach(card => {
                if (card.playable) {
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
        players: m_Players,
        Deck: m_Deck,

        getCurrentPlayerIndex: function(){
            return currentPlayerIndex;
        },
        playRound: function (elem) {
            playTurn(elem);
        },
        drawCardToPlayer: function () {
            var card = Deck.drawCard(m_Players[currentPlayerIndex]);
            uiModule.addCardToPlayer(m_Players[currentPlayerIndex], card);
        }
    }

}


