function Player(name, isComputer, playerIndex, score, Hand, PlayerType, CurrentAmountOfCards) {
    this.name = name;
    this.playerIndex = playerIndex;
    this.score = score;
    this.hand = Hand;
    this.playerType = PlayerType;
    this.currentAmountOfCards = CurrentAmountOfCards;
    this.isStopped = false;
    this.hasPlayableHand = true;

    this.playerTypeEnum = {
    	Human: 1,
        Computer: 2
    }

    this.discardCard = function (selectedCard) {
        var removedCard = null;
        var cardIndexInHand = this.hand.findIndex(function (card) {
            return card === selectedCard;
        });
        if (0 <= cardIndexInHand && cardIndexInHand < this.hand.length) {
            removedCard = this.hand.splice(cardIndexInHand, 1);
        }
        return removedCard;
    }


}
