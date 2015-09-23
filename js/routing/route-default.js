game.routeLandingPage = function(modeName) {
    $('#content').html($('#landing-page').html());
    game.utils.setModeTitle(modeName);
}
