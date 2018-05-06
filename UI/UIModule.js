function startGame() {
    var numOfPlayers = 2;
    uiModule.initGame(numOfPlayers, gameTypeEnum.PVC);
}

var uiModule = (function () {
    var m_Players=[];
    function createPlayers(numOfPlayers, gameType) {
        for (var playerIndex = 0; playerIndex < numOfPlayers; playerIndex++) {
            var player = new Player('Player ' + playerIndex, playerIndex);
            m_Players.push(player);
        }
        initPlayersType(gameType);
        console.log("Created " + numOfPlayers + " players.")

        function initPlayersType(gameType) {
            m_Players[0].playerType = playerTypeEnum.Human;
            var playerIndex;
            if (gameType === gameTypeEnum.PVC) { // Player vs Computer
                // init the rest of the players to Computer.
                for (playerIndex = 1; playerIndex < m_Players.length; playerIndex++) {
                    m_Players[playerIndex].playerType = playerTypeEnum.Computer;
                }
            }
            else { // Player vs Players.
                for (playerIndex = 1; playerIndex < m_Players.length; playerIndex++) {
                    m_Players[playerIndex].playerType = playerTypeEnum.Human;
                }
            }
        }
    }

    function populateDeck(i_Deck) {
        // todo: stack the flippedCards on top of each other.
        var drawPileElement = document.getElementById("draw-pile");
        var discardPileElement = document.getElementById("discard-pile");
        i_Deck.drawPile.forEach(card => {
            var flippedCardElement = createFlippedCardElement(card);
            flippedCardElement.onclick = function () {
                //todo: event should draw from stack to active player turn.
                this.game.drawCardToPlayer();
            };
            drawPileElement.appendChild(flippedCardElement);
        })

        // create first card discarded element.
        var firstCardDiscardedElement = createShownCardElement(i_Deck.discardPile[0]);
        discardPileElement.appendChild(firstCardDiscardedElement);
    }

    function populatePlayers(players) {
        var playersElement = document.getElementById("playersContainer");
        players.forEach(player => {
            var playerElement = createPlayerElement(player);
            playersElement.appendChild(playerElement);
        })

        function createPlayerElement(player) {
            var playerElement = document.createElement("div");
            playerElement.className = "player" + (player.playerIndex + 1);
            var playerHandElement = createPlayerHandElement(player);
            var playerDiskElement = createPlayerDiskElement(playerElement);
            dealHandToPlayer(player, playerHandElement);

            playerElement.appendChild(playerHandElement);
            playerElement.appendChild(playerDiskElement);

            //todo: draw player name and etc...

            function createPlayerDiskElement() {
                var playerDiskElement = document.createElement("div");
                playerDiskElement.className = "disk";
                return playerDiskElement;
            }

            function createPlayerHandElement() {
                var playerHandElement = document.createElement("div");
                playerHandElement.className = "hand";

                return playerHandElement;
            }

            function dealHandToPlayer(player, playerHandElement) {
                var cardIndex;
                //todo: should be playerIndex
                if (player.playerIndex === 0) { // playing user
                    for (cardIndex = 0; cardIndex < player.hand.length; cardIndex++) {
                        var shownCardElement = createShownCardElement(player.hand[cardIndex]);
                        shownCardElement.onclick = function () {
                            /*
                            1. is my turn?
                            2.
                            //todo: add index to each card.
                            it will be easier to get the card on backend after knowing the index.
                            */
                            console.log(shownCardElement.value + " " + shownCardElement.color + /*todo: add isWild*/" was clicked.");
                            if(this.game.getCurrentPlayerIndex() == this.players[0].playerIndex){
                                //todo: throw card.
                                this.OnClickedCard(this);
                                // this.game.playRound(this);

                            }
                            else{
                                alert("not your turn.");
                            }
                        };
                        playerHandElement.appendChild(shownCardElement);
                    }
                }
                else { // computer/ other players.
                    for (cardIndex = 0; cardIndex < player.hand.length; cardIndex++) {
                        var flippedCard = createFlippedCardElement(player.hand[cardIndex]);
                        playerHandElement.appendChild(flippedCard);
                    }
                }
            }

            return playerElement;
        }
    }

    function createFlippedCardElement(card) {
        var flippedCard = document.createElement("div");
        flippedCard.className = "card flipped-card";
        return flippedCard;
    }

    function createShownCardElement(card) {
        var cardElement = document.createElement("div");
        var valueElement = createCardValueElement(card);
        cardElement.appendChild(valueElement);
        cardElement.className = "card shown-card";
        cardElement.style.color = card.color;

        cardElement.setAttribute("cardColor", card.color);
        cardElement.setAttribute("cardValue", card.value);
        cardElement.setAttribute("isWild", card.isWildCard);

        function createCardValueElement(card) {
            var valueElement = document.createElement("div");
            valueElement.className="card-value";
            var topValueElement = document.createElement("div");
            var bottomValueElement = document.createElement("div");
            var middleValueElement = document.createElement("div");

            /* // todo: pull images from Resources/Cards
              var cardMainImage=document.createElement("img");
              cardMainImage.className="mainImage";
              cardMainImage.style.backgroundImage("Resources/Cards/MainImages/"+card.color+card.value);*/
            middleValueElement.className = "middle";
            topValueElement.className = "top";
            bottomValueElement.className = "bottom";
            middleValueElement.innerHTML = bottomValueElement.innerHTML = topValueElement.innerHTML = card.value;

            valueElement.appendChild(middleValueElement);
            valueElement.appendChild(topValueElement);
            valueElement.appendChild(bottomValueElement);

            return valueElement;
        }

        return cardElement;
    }

    return {
        game: null,
        players: m_Players,

        changeColorPrompt: function () {
            var validColor = false
            while (!validColor) {
                var colorInput = prompt("Please choose a color to change:");
                if (Object.keys(Deck.colorsEnum).includes(colorInput.toLowerCase())) {
                    validColor = true;
                    Deck.changeTopDiscardColor(colorInput.toLowerCase());
                } else {
                    alert("The color you've entered isn't valid");
                }
            }
        },

        invalidCardChoicePrompt: function () {
            alert("You've chosen invalid card, please choose another one.")
        },

        updateTopDiscardCard: function (card) {

            var topCard = document.getElementsByClassName("discard-pile")[0];
            topCard = topCard.getElementsByClassName("card")[0];
            topCard.parentElement.replaceChild(card, topCard)
        },

        removeCardAtIndex: function (playerIndex, cardIndex) {
            var cardElement = document.getElementsByClassName("player" + (playerIndex + 1));
            cardElement = cardElement[0].getElementsByClassName("shown-card")[cardIndex];

            this.updateTopDiscardCard(cardElement);
        },

        addCardToPlayer: function (player, card) {
            var playerDiv = document.getElementsByClassName("player" + (player.playerIndex + 1))[0];
            var playerHand = playerDiv.getElementsByClassName("hand");
            var cardElement = document.createElement("div");
            if (player.playerType == player.playerTypeEnum.Human) {

                createShownCardElement(card, cardElement);
                cardElement.onclick = function () {
                    Game.playRound(this);
                };
                playerHand[0].appendChild(cardElement);

            } else {

                cardElement.className = "card flipped-card";
                playerHand.appendChild(flippedCard);
            }

        },

        getClickedPlayerParentOfElem: function (element) {
            var playerName = element.parentElement.parentElement.getAttribute("class");
            return playerName[playerName.length - 1];
        },

        enablePlayerCards: function (playerIndex) {
            var playerElement = document.getElementsByClassName("player" + (playerIndex + 1));
            var handElem = playerElement[0].getElementsByClassName("hand")[0];

            handElem.disabled = true;
        },

        disablePlayerCards: function (playerIndex) {
            var playerElement = document.getElementsByClassName("player" + (playerIndex + 1));
            var handElem = playerElement[0].getElementsByClassName("hand")[0];

            handElem.disabled = false;

        },


        initGame: function (numOfPlayers, gameType) {
            // creating the players and the game.
            createPlayers(numOfPlayers, gameType);
            this.game = Game(numOfPlayers, m_Players, gameType);

            // UI creation
            populateDeck(this.game.Deck);
            populatePlayers(m_Players);
        }
    }

})
();

