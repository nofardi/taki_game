function Player(name, isComputer, playerIndex, score, Hand, PlayerType, CurrentAmountOfCards) {
    this.name = name;
    this.playerIndex = playerIndex;
    this.isStopped=false;
    this.score = score;
    this.hand = Hand;
    this.playerType = PlayerType;
    this.currentAmountOfCards = CurrentAmountOfCards;
}
