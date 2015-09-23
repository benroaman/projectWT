game.routeStandardBoard = function(peopleSet, size, modeName, store) {
    game.standardBoardTemplateHandler(peopleSet, size);
    game.utils.flipIn();
    game.utils.initializeResetButton();
    game.utils.setModeTitle(modeName);
    game.standardLogic(store);
};
