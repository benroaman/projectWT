// provides logic for classic game modes (classic and matt)

game.standardLogic = function(store) {
    // '.attempts-remaining' is not used in classic modes
    $('.attempts-remaining').remove();
    var timer = game.utils.initializeTimer();
    var deck = $('.card');
    // randomly select a card from the deck to be the answer and store its id
    var correct = $(deck.get(Math.floor(Math.random() * deck.length))).attr('id');
    $('.target-name').text(' ' + correct);

    $('.card').on('click', function(e) {
        var guess = $(this).attr('id');
        // check for win state
        if (guess === correct) {
            game.utils.stopGame(timer);
            // the score multiplier is based on the number of remaining guesses
            var points = game.utils.getPoints((4 - $('.overlay-red').length), timer.getMils())
            game.utils.initializeWinState(store, points);
        } else {
            // both of these elements need to shake
            $(e.target).addClass('overlay-red shake');
            $(this).children('img').addClass('shake');
            $(this).off();
            // check for loss state
            if ($('.overlay-red').length == $('.card').length - 1) {
                game.utils.stopGame(timer);
                game.utils.initializeLossState();
            }
        }
    });
}
