// generates high score view

game.highscoreTemplateHandler = function() {

    // this process uses $.append rather than $.html so we need to clear #content first
    $('#content').html('');
    game.highscoreTemplateHandler.addHighScoreColumn(game.classicStore, game.const.CLASSIC_MODENAME);
    game.highscoreTemplateHandler.addHighScoreColumn(game.mattStore, game.const.MATT_MODENAME);
    game.highscoreTemplateHandler.addHighScoreColumn(game.matchStore, game.const.MATCH_MODENAME);
    game.highscoreTemplateHandler.addHighScoreColumn(game.matchMattStore, game.const.MATCH_MATT_MODENAME);
    $('#content').append($('#post-highscore-menu').html());
    $('.restart').remove();
}

game.highscoreTemplateHandler.addHighScoreColumn = function(store, modeName) {
    var column = _.template($('#score-column').html(), { variable: 'm' });
    $('#content').append(column({ scores: store }));
    $('.game-mode').last().text(modeName);
}
