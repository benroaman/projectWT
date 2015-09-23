game.matchLogic = function(numAttempts, store, deckSize) {

    var attemptsRemaining = numAttempts;
    var timer = game.utils.initializeTimer();

    $('.instructions').text('drag name cards to matching photos')

    $('.match-card').on('mousedown', function(e) {
        var card = $(this);
        //origin offsets used to maintain card position on click
        var originX = card.offset().left;
        var originY = card.offset().top;
        // setup draggable card and replace with filler
        var dragCard = card.clone(true);
        dragCard.addClass('selected');
        $('body').append(dragCard);
        $('.selected').css({
            left: originX,
            top: originY,
            position: 'absolute'
        });
        card.replaceWith($('#filler').html());
        //these values are used to maintain the pointers relative
        //position within the card
        offsetX = e.offsetX;
        offsetY = e.offsetY;

        $('body').on('mouseup', drop);
        $('body').on('mousemove', drag);
        $(document).on('selectstart dragstart', cancelTextSelection)

        function cancelTextSelection(e) {
            e.preventDefault();
        }

        // resets the position of the card as we move the mouse
        function drag(e) {
            $('.selected').css({
                left: (e.pageX - offsetX),
                top: (e.pageY - offsetY)
            });
        }

        // because the dragCard will always be between our mouseup event
        // and our target element, this function hides the card and
        // triggers a click event on our current coordinates
        function drop(e) {
            $('body').on('click', game.utils.resetSelected);
            $('.available').on('click', submitGuess);
            $(e.target).hide();
            // in case the user triggers the click over a menu btn
            $('.click-shield').show();
            document.elementFromPoint(e.pageX, e.pageY).click();
            $('.click-shield').hide();
            $(e.target).show();
            $('body').off('click', game.utils.resetSelected);
            // if correct, card doesnt have the available class, use class 'card'
            $('.card').off('click', submitGuess);
        }

        // check guess for correctness and provide actions appropriate to result
        var submitGuess = function(e) {
            e.stopPropagation();
            attemptsRemaining = game.utils.updateAttempts(attemptsRemaining);
            var guess = $(this);
            //check correctness
            if (guess.attr('id') === $('.selected').attr('id')) {
                guess.children('div').addClass('overlay-green');
                guess.removeClass('available');
                // filler-actual class is used to return current dragCard to its
                // original spot, there can be only one
                $('.filler-actual').removeClass('filler-actual');
                $('.selected').remove();
                // check for win state
                if ($('.overlay-green').length === deckSize) {
                    game.utils.stopGame(timer);
                    var points = game.utils.getPoints(attemptsRemaining, timer.getMils());
                    game.utils.initializeWinState(store, points);
                    game.utils.resetSelected();
                    return;
                }
            } else {
                game.utils.resetSelected();
                guess.addClass('shake');
                // one card can be incorrectly guessed multiple times in this mode
                setTimeout(function () { guess.removeClass('shake'); }, 350);
            }
            // check for loss state
            if (attemptsRemaining === 0) {
                game.utils.stopGame(timer);
                game.utils.initializeLossState();
            }
            game.utils.resetSelected();
        }
    });
}
