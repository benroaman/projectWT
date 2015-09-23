// generate all the routes for the game

game.routes = function() {

    game.router.add('', function() {
        game.routeLandingPage(game.const.MAIN_MODENAME);
    });

    game.router.add('classic', function() {
        game.routeStandardBoard(game.people.data,
                                  game.const.DECK_SIZE,
                                  game.const.CLASSIC_MODENAME,
                                  game.classicStore);
    });

    game.router.add('mattmode', function() {
        game.routeStandardBoard(game.people.matts,
                                  game.const.DECK_SIZE,
                                  game.const.MATT_MODENAME,
                                  game.mattStore);
    });

    game.router.add('matchmode', function() {
        game.routeMatchBoard(game.people.data,
                              game.const.DECK_SIZE,
                              game.const.MATCH_MODENAME,
                              game.const.MATCH_ATTEMPTS,
                              game.matchStore);
    })

    game.router.add('matchmattmode', function() {
        game.routeMatchBoard(game.people.matts,
                              game.const.DECK_SIZE,
                              game.const.MATCH_MATT_MODENAME,
                              game.const.MATCH_ATTEMPTS,
                              game.matchMattStore);
    })

    game.router.add('highscores', function() {
        game.routeHighscores(game.const.HIGHSCORES_MODENAME);
    })
}
