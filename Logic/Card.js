function Card(value, color, isWildCard, cardType) {
    this.value = value;
    this.color = color;
    this.isWildCard = isWildCard;
    // this.state = this.cardStateEnum.Closed;
    // this.cardStateEnum = {
    //     Opened: 1,
    //     Closed: 2
    // }
    this.cardType = cardType;
    this.cardTypeEnum = {
        TAKI: 1,
        PLUS: 2,
        CHANGE_COLOR: 3,
        PLUS2: 4 //for next stage
    }
}
