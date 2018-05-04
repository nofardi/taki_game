var uiModule = (function () {
    return {
        populateDeck: function () {
            var flippedCard = document.createElement("img");
            var drawPile = document.getElementsByClassName("draw-pile")[0];
            flippedCard.className = "flipped-card";
            //TODO: need to set the other attributes appropriately.

            drawPile.appendChild(flippedCard);
            //TODO: need to stack a bunch of cards on each other.
        },

        populatePlayers: function (players) {
            var playersDiv = document.getElementsByClassName("players")[0];

            this.drawPlayer = function (playerDiv) {
                // draw disk.
                var playerDisk= document.createElement("img");
                playerDisk.className="disk";
                playerDiv.appendChild(playerDisk);
            }
            players.forEach(player => {
                var playerDiv = document.createElement("div");
                playerDiv.className = "player" + (player.playerIndex + 1);
                this.drawPlayer(playerDiv);
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
                        flippedCard.className = "card flipped-card";
                        playerHand.appendChild(flippedCard);
                    }
                }
                else if (player.playerType == player.playerTypeEnum.Human) {
                    for (cardIndex = 0; cardIndex < player.hand.length; cardIndex++) {
                        var shownCard = document.createElement("div");
                        this.drawUpCard(player.hand[cardIndex], shownCard, "card shown-card");
                        shownCard.onclick = function () {
                            Game.playRound(this);
                            console.log(shownCard.value+" "+shownCard.color+" was clicked.");
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
                var bottom = document.createElement("div");
                var middle= document.createElement("div");

              /* // todo: pull images from Resources/Cards
                var cardMainImage=document.createElement("img");
                cardMainImage.className="mainImage";
                cardMainImage.style.backgroundImage("Resources/Cards/MainImages/"+card.color+card.value);*/
                middle.className="middle";
                top.className = "top";
                bottom.className = "bottom";
              middle.innerHTML=  bottom.innerHTML = top.innerHTML = card.value;

                cardElement.appendChild(middle);
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
            //cardElement.setAttribute("cardType", card.cardType);
        },

        changeColorPrompt: function () {
            var validColor = false
            while(!validColor) {
                var colorInput = prompt("Please choose a color to change:");
                if(Object.keys(Deck.colorsEnum).includes(colorInput.toLowerCase())) {
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
            // todo: fix, doesn't work good... doesn't draw card.
            var topCard = document.getElementsByClassName("discardTopCard")[0];
            this.drawUpCard(card, topCard, "discardTopCard");
        }, 

        removeCardAtIndex: function(playerIndex, cardIndex) {
            var cardElement = document.getElementsByClassName("player" + (playerIndex + 1));
            cardElement = cardElement[0].getElementsByClassName("shown-card")[cardIndex];

            cardElement.style.display = "none";
        },

        getClickedPlayerParentOfElem: function(element) {
            var playerName = element.parentElement.parentElement.getAttribute("class");
            return playerName[playerName.length - 1];
        },

        enablePlayerCards: function(playerIndex) {
            var playerElement = document.getElementsByClassName("player" + (playerIndex + 1));
            var handElem = playerElement[0].getElementsByClassName("hand")[0];

            handElem.disabled = true;
        },

        disablePlayerCards: function(playerIndex) {
            var playerElement = document.getElementsByClassName("player" + (playerIndex + 1));
            var handElem = playerElement[0].getElementsByClassName("hand")[0];

            handElem.disabled = false;

        }
    }

})();

