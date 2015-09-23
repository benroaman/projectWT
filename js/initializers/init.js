$(function () {
    $.getJSON('http://api.namegame.willowtreemobile.com/').done(function(data) {
        game.initializePeople(data);
        game.initializeRouter();
        game.initializeStores();
        game.utils.processHash();
    });
});
