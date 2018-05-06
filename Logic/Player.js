function Player(name, playerIndex) {
    this.name = name;
    this.playerIndex = playerIndex;
    this.playerType = null;
    this.score = 0;
    this.hand = [];
    this.currentAmountOfCards = 0;
    this.isStopped = false;
    this.hasPlayableHand = true;

    this.playerTypeEnum = {
        Human: 1,
        Computer: 2
    }

    this.discardCard = function (selectedCard) {
        var cardIndexInHand = this.hand.findIndex(function (card) {
            return (card.value == selectedCard.value &&
                card.color == selectedCard.color &&
                card.isWildCard == selectedCard.isWildCard);
        });
        if (0 <= cardIndexInHand && cardIndexInHand < this.hand.length) {
            return cardIndexInHand;
        }
    }


}
