game.utils = {};

   ///////////////////////////
  // general use functions //
 ///////////////////////////

game.utils.setModeTitle = function(title) {
    $('.mode-title').text(title);
}

game.utils.processHash = function() {
    var hash = location.hash || '#';
    if (!game.router.run(hash.slice(1))) {
        game.pageNotFound();
    }
};

   //////////////////////////
  // game setup functions //
 //////////////////////////

game.utils.shuffle = function(deck) {
    var mixDeck = [];

    while (deck.length > 0) {
        mixDeck.push(deck.splice(Math.floor(Math.random()*deck.length), 1)[0]);
    }

    return mixDeck;
};

game.utils.initializeResetButton = function() {
    $('.restart').click(function() {
        game.router.run(location.hash.slice(1))
    });
};

// provides animations on game-start
game.utils.flipIn = function() {
    $(document).ready(function() {
        $('#match-card-cont').addClass('flipInX');
        $('#person-card-cont').addClass('flipInX');
    });
};

   //////////////////////////
  // match mode functions //
 //////////////////////////

game.utils.updateAttempts = function(attemptsRemaining) {
    attemptsRemaining--;
    $('.attempts-remaining-actual').text(attemptsRemaining);
    return attemptsRemaining;
};

   /////////////////////////////////////////
  // helper functions for all game modes //
 /////////////////////////////////////////

game.utils.initializeTimer = function() {
    var timer = game.utils.Timer();
    timer.start(function() {
        timer.stop();
        game.utils.initializeLossState();
    });
    return timer;
};

game.utils.initializeWinState = function(store, points) {
    game.utils.initializeGameState(game.const.WIN_COLOR, 'success!');
    $('#match-card-cont').text(points + ' points');
    $('#match-card-cont').addClass('points-display');
    game.utils.highscoreHandler(store, points);
};

// handles checking, displaying and storing high scores
game.utils.highscoreHandler = function(store, points) {
    if (store.isHighScore(points)) {
        $('.gamestate').text('high score!');
        $('.game-nav').html($('#highscore-entry').html());
        $('.highscore').text(points);
        $('.score-submit').on('click', game.utils.submitHighscore(store, points));
    }
};

game.utils.submitHighscore = function(store, points) {
    return function() {
        var initials = $('.initials').val();
        if (initials !== '') {
            var newScore = game.Score({initials: initials.toUpperCase(), points: points})
            store.addScore(newScore);
            $('#content').html('');
            game.highscoreTemplateHandler.addHighScoreColumn(store, 'High Scores');
            $('#content').append($('#post-highscore-menu').html());
            game.utils.initializeResetButton();
        } else {
            $('.no-initials-alert').text(game.const.NO_INITIALS);
        }
    };
};

game.utils.initializeLossState = function() {
    game.utils.initializeGameState(game.const.LOSS_COLOR, 'failure!');
};

// setup aesthetics for a givem game state
game.utils.initializeGameState = function(colorString, stateString) {
    $('.gamestate').text(stateString);
    $('.overlay').removeClass('overlay_red');
    $('.overlay').removeClass('overlay_green');
    $('.overlay').addClass('overlay_done');
    $('.gamestate').css({
        color: colorString,
    })
    $('.gamestate').addClass('flipInX');
    $('.restart').css({
        'background-color': colorString
    })
    $('.restart').addClass('hilight');
};

game.utils.getPoints = function(attemptsRemaining, mils) {
    var multiplier = 1 + (attemptsRemaining/10)*2;
    return parseInt(multiplier * mils, 10);
};

game.utils.stopGame = function(timer) {
    $('.match-card').off();
    $('.card').off();
    timer.stop();
};

game.utils.resetSelected = function() {
    $('.filler-actual').replaceWith($('.selected'));
    $('.selected').css({
        position: 'relative',
        top: 0,
        left: 0,
        display: 'inline-block'
    });
    $('.selected').removeClass('selected');
    $('body').off();
    $(document).off();
};
