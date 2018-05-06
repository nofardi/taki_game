function Deck() {
    var numbersEnum = [
        // numbers
        1, 3, 4, 5, 6, 7, 8, 9,
    ];

    var colorsEnum = {
        green: "GREEN",
        yellow: "YELLOW",
        red: "RED",
        blue: "BLUE",
    };
// TODO: change to wildCardsEnum group, write the syntax better.
    var coloredWildCardsEnum = {
        taki: 'TAKI',
        stop: 'STOP'
    };
    var colorlessWildCardsEnum = {
        changeColor: 'CHANGE_COLOR'
    };
    var m_DrawPile=[], m_DiscardPile=[];

    createCards();
    shuffle(m_DrawPile);
    // initDiscardDeck();

    function createCards(){
        var cardValue, colorIndex, returnIndex, wildCardValue;
        var numOfCardsReturn = 2;
        for (returnIndex = 0; returnIndex < numOfCardsReturn; returnIndex++) { //two of each card.
            for (colorIndex = 0; colorIndex < Object.keys(colorsEnum).length; colorIndex++) {
                for (cardValue = 0; cardValue < numbersEnum.length; cardValue++) {
                    var card = new Card(numbersEnum[cardValue], colorsEnum[Object.keys(colorsEnum)[colorIndex]], false);
                    m_DrawPile.push(card);
                }
                for (wildCardValue = 0; wildCardValue < Object.keys(coloredWildCardsEnum).length; wildCardValue++) {
                    var card = new Card(coloredWildCardsEnum[Object.keys(coloredWildCardsEnum)[wildCardValue]], colorsEnum[Object.keys(colorsEnum)[colorIndex]], true);
                    m_DrawPile.push(card);
                }
            }
            for (wildCardValue = 0; wildCardValue < Object.keys(colorlessWildCardsEnum).length; wildCardValue++) {
                var card = new Card(colorlessWildCardsEnum[Object.keys(colorlessWildCardsEnum)[wildCardValue]], 'COLORLESS', true);
                m_DrawPile.push(card);
            }
        }
    }
    function shuffle(pileToShuffle) {
        //  Fisher-Yates shuffle
        //fixme: doesn't shuffle enough.
        var i;
        var j = 0;
        var temp = null;

        for (i = pileToShuffle.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = pileToShuffle[i];
            pileToShuffle[i] = pileToShuffle[j];
            pileToShuffle[j] = temp;
        }
    }
    function initDiscardDeck(){
        if(m_DiscardPile.length == 0) {
            m_DiscardPile.push(m_DrawPile.pop());
        }
        // uiModule.initDiscardDeck(m_DiscardPile[m_DiscardPile.length - 1]);
        // this.top();
    }
    function refillDrawPile() {
        var lastDrawnCard = Deck.discardPile.pop();
        while (Deck.discardPile.length != 0) {
            Deck.drawPile.push(Deck.discardPile.pop());
        }
        m_DiscardPile.push(lastDrawnCard);
        this.shuffle(m_DrawPile);
    }

    return {
        discardPile: m_DiscardPile ,
        drawPile: m_DrawPile,
        colorsEnum: colorsEnum,
        coloredWildCardsEnum: coloredWildCardsEnum,
        colorlessWildCardsEnum: colorlessWildCardsEnum,
        numbersEnum: numbersEnum,


        top: function () {
      //      uiModule.updateTopDiscardCard(discardPile[discardPile.length - 1]);
            return m_DiscardPile[m_DiscardPile.length - 1];
        },

        drawCard: function (player) {
            if (Deck.drawPile.length >= 1) {
                player.hand.push(Deck.drawPile.pop());
                return player.hand[player.hand.length - 1];
            }
            else {
                refillDrawPile();
            }
        },


        changeTopDiscardColor: function(color) {
            m_DiscardPile[m_DiscardPile.length - 1].color = color;
            m_DiscardPile[m_DiscardPile.length - 1].value = colorlessWildCardsEnum.changeColor;
            uiModule.updateTopDiscardCard(m_DiscardPile[m_DiscardPile.length - 1]);
        },

    }
}
