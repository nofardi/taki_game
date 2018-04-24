var uiModule = (function () {

    return {
        populateDeck: function(){
            var flippedCard=document.createElement("img");
            var drawPile=document.getElementsByClassName("draw-pile")[0];
            flippedCard.src="Resources/FlippedCard.png"
            drawPile.appendChild(flippedCard)
        },

        populatePlayers: function (players) {

        }


    }

})();
