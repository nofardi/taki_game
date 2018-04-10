function exit_button_clicked() {
	alert("You've exited the game!");
}

var colors = ["Green", "Yellow", "Red", "Blue"];
var values = ["1", "3", "4", "5", "6", "7", "8", "9", "Taki", "Stop", "ChangeColor"];
var deck = new Array();
var players = new Array();
var currentPlayer = 0;

function createDeck() {
    deck = new Array();
    for (var cardValue = 0; cardValue < values.length; cardValue++) {
        for (var color = 0; color < colors.length; color++) {
            for (var i = 0; i < 2; i++) {
                //TODO: no weight needed, what should we do instead?
                /*var weight = parseInt(values[cardValue]);
                if (values[cardValue] == "J" || values[cardValue] == "Q" || values[cardValue] == "K")
                    weight = 10;
                if (values[cardValue] == "A")
                    weight = 11;*/
                var card = {Value: values[cardValue], Suit: suits[color], Weight: weight};
                deck.push(card);
            }
        }
    }
}