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
            var playerDiv = document.getElementByClassName("players");
            var flippedCard = document.createElement("img");
            flippedCard.src = "Resources/FlippedCard.png" ;
            flippedCard.className="flipped-card";
            players.forEach(player => {
                if(player.playerType == playerTypeEnum.Computer)
                    
                else if(player.playerType == playerTypeEnum.Human)
                //TODO: populate players according to playerType.
                //TODO: populate players

            })
        },

    }

})();

