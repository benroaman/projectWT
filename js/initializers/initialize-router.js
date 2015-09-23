game.initializeRouter = function() {
    game.router = Rlite();
    game.routes();
    window.addEventListener('hashchange', game.utils.processHash);
};
