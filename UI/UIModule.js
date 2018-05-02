var uiModule = (function () {
    return {
        populateDeck: function () {
            var flippedCard = document.createElement("img");
            var drawPile = document.getElementsByClassName("draw-pile")[0];
            flippedCard.src = "Resources/FlippedCard.png" ;
            flippedCard.className="flipped-card";
            //TODO: need to set the other attributes appropriately.

            drawPile.appendChild(flippedCard);
            //TODO: need to stack a bunch of cards on each other.
        },

        populatePlayers: function (players) {
            var playersDiv = document.getElementsByClassName("players")[0];
            players.forEach(player => {
                var playerDiv = document.createElement("div");
                if(player.playerType == player.playerTypeEnum.Computer)
                {
                    playerDiv.className = "comp-player";

                }
                else if(player.playerType == player.playerTypeEnum.Human)
                {
                    playerDiv.className = "human-player";   
                }
                
                var playerName = document.createElement("div");
                playerName.innerHTML = player.name;
                playerDiv.appendChild(playerName);
                playersDiv.appendChild(playerDiv);

            })
        },

        dealHandsToPlayers: function(players) {
            var compPlayerDivs = document.getElementsByClassName("comp-player");
            var humanPlayerDivs = document.getElementsByClassName("human-player"); 
            var compDivArr = Array.from(compPlayerDivs);
            var humanDivArr = Array.from(humanPlayerDivs);

            var cardIndex;
            players.forEach(player => {
                if(player.playerType == player.playerTypeEnum.Computer)
                {
                    var compPlayerDiv = compDivArr.pop();
                    for(cardIndex = 0; cardIndex < player.hand.length; cardIndex++)
                    {
                        var flippedCard = document.createElement("img");
                        flippedCard.src = "Resources/FlippedCard.png" ;
                        flippedCard.className="flipped-card";
                        compPlayerDiv.appendChild(flippedCard);
                    }
                }
                else if(player.playerType == player.playerTypeEnum.Human)
                {
                    var humanPlayerDiv = humanDivArr.pop();
                    for(cardIndex = 0; cardIndex < player.hand.length; cardIndex++)
                    {
                        var upCard = document.createElement("img");
                        upCard.className = "human-cards"
                        this.drawUpCard(player.hand[cardIndex], upCard);
                        upCard.onclick = function() {Game.playRound(this); };
                        //add dragging functionality to the discard pile
                        humanPlayerDiv.appendChild(upCard);
                    }
                }
            })
        },

        drawUpCard: function(card, element) {
            element.setAttribute("cardColor", card.color);
            element.setAttribute("cardValue", card.value);
            element.setAttribute("isWild", card.isWildCard);
            element.setAttribute("cardType", card.cardType);

            //todo: add styles
        },

        changeColorPrompt: function() {

        }

        invalidCardChoicePrompt: function() {
            alert("You've chosen invalid card, please choose another one.")
        }

    }

})();

