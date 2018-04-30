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

    }

})();

