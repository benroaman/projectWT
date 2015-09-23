game.routeMatchBoard = function(peopleSet, size, modeName, attempts, store) {
    game.matchBoardTemplateHandler(peopleSet, size);
    game.utils.flipIn();
    game.utils.initializeResetButton();
    game.utils.setModeTitle(modeName);
    game.matchLogic(attempts, store, size);
};
