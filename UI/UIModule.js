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
                var playerDiv = document.getElementsByClassName("player" + (player.playerIndex+1))[0];
                var playerHand=document.createElement("div");
                playerHand.className="hand";

                if (player.playerType == player.playerTypeEnum.Computer) {
                    for (cardIndex = 0; cardIndex < player.hand.length; cardIndex++) {
                        var flippedCard = document.createElement("div");
                        flippedCard.className = "flipped-card";
                        playerHand.appendChild(flippedCard);
                    }
                }
                else if (player.playerType == player.playerTypeEnum.Human) {
                    for (cardIndex = 0; cardIndex < player.hand.length; cardIndex++) {
                        var upCard = document.createElement("div");
                        this.drawUpCard(player.hand[cardIndex], upCard);

                        playerHand.appendChild(upCard);
                    }
                }
                playerDiv.appendChild(playerHand);
            })
        },

        drawUpCard: function (card, element) {
            element.innerHTML=card.value;
            element.className="shown-card";
        }


    }

})();

