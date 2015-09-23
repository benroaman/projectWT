game.initializeStores = function() {
    game.classicStore = game.ScoreStore('classicStore');
    game.classicStore.load();
    game.mattStore = game.ScoreStore('mattStore');
    game.mattStore.load();
    game.matchStore = game.ScoreStore('matchStore');
    game.matchStore.load();
    game.matchMattStore = game.ScoreStore('matchMattStore');
    game.matchMattStore.load();
}
