var uiModule = (function () {
    return {
        populateDeck: function () {
            var flippedCard = document.createElement("img");
            var drawPile = document.getElementsByClassName("draw-pile")[0];
            flippedCard.src = "Resources/FlippedCard.png";
            flippedCard.className = "flipped-card";
            //TODO: need to set the other attributes appropriately.

            drawPile.appendChild(flippedCard);
            //TODO: need to stack a bunch of cards on each other.
        },

        populatePlayers: function (players) {
            var playersDiv = document.getElementsByClassName("players")[0];

            players.forEach(player => {
                var playerDiv = document.createElement("div");
                playerDiv.className = "player" + (player.playerIndex + 1);
                playersDiv.appendChild(playerDiv);
            })
        },

        dealHandsToPlayers: function (players) {
            players.forEach(player => {
                var cardIndex;
                var playerDiv = document.getElementsByClassName("player" + (player.playerIndex + 1))[0];
                var playerHand = document.createElement("div");
                playerHand.className = "hand";

                if (player.playerType == player.playerTypeEnum.Computer) {
                    for (cardIndex = 0; cardIndex < player.hand.length; cardIndex++) {
                        var flippedCard = document.createElement("div");
                        flippedCard.className = "flipped-card";
                        playerHand.appendChild(flippedCard);
                    }
                }
                else if (player.playerType == player.playerTypeEnum.Human) {
                    for (cardIndex = 0; cardIndex < player.hand.length; cardIndex++) {
                        var shownCard = document.createElement("div");
                        this.drawUpCard(player.hand[cardIndex], shownCard, "shown-card");
                        shownCard.onclick = function () {
                            Game.playRound(this);
                        };
                        playerHand.appendChild(shownCard);
                    }
                }
                playerDiv.appendChild(playerHand);
            })
        },

        drawUpCard: function (card, cardElement, className) {

            this.drawCardValue = function (card, cardElement) {
                var top = document.createElement("div");
                var middle= document.createElement("div");
                var bottom = document.createElement("div");
                top.className = "top";
                middle.className="middle";
                bottom.className = "bottom";
                bottom.innerHTML = top.innerHTML = card.value;

                cardElement.appendChild(top);
                cardElement.appendChild(bottom);

            }
            this.drawCardValue(card, cardElement);


            // element.style.backgroundColor = card.color;
            cardElement.className = className;
            cardElement.style.color=card.color;
            cardElement.setAttribute("cardColor", card.color);
            cardElement.setAttribute("cardValue", card.value);
            cardElement.setAttribute("isWild", card.isWildCard);
            cardElement.setAttribute("cardType", card.cardType);
        },

        changeColorPrompt: function () {
        },

        invalidCardChoicePrompt: function () {
            alert("You've chosen invalid card, please choose another one.")
        },

        updateTopDiscardCard: function (card) {

            var topCard = document.getElementsByClassName("discardTopCard")[0];
            this.drawUpCard(card, topCard, "discardTopCard");
        }
    }

})();

