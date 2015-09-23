game.utils.Timer = function() {
    // var clock = $('#game-timer');
    var min = $('#min');
    var sec = $('#sec');
    var mil = $('#mil');
    var timer;

    function updateTimer(endFunction) {
        milNum = Number(mil.text());
        secNum = Number(sec.text());
        minNum = Number(min.text());
        originalSec = secNum;
        originalMil = milNum;
        originalMin = minNum;
        if (!(milNum + secNum + minNum)) {
            endFunction();
            originalMil++
        }
        if (milNum > 0) {
            milNum--;
        }
        if (milNum < 10) {
            mil.text('0' + milNum);
        } else {
            mil.text(milNum);
        }
        if (!originalMil) {
            mil.text('99');
            if (secNum > 0) {
                secNum--;
            }
            if (secNum < 10) {
                sec.text('0' + secNum);
            } else {
                sec.text(secNum);
            }
        }
        if (!originalSec) {
            if (originalMin) {
                sec.text('59');
            }
            if (minNum > 0) {
                minNum--;
            }
            if (minNum < 10) {
                min.text('0' + minNum);
            } else {
                min.text(minNum);
            }
        }
    }

    return {
        start: function(endFunction) {
            endFunction = endFunction || this.stop;
            timer = setInterval(function() {updateTimer(endFunction)}, 10);
        },
        stop: function() {
            clearInterval(timer);
        },
        reset: function() {
            min.text('00');
            sec.text('00');
        },
        getMils: function() {
            return Number(mil.text()) + (Number(sec.text()) * 100) + (Number(min.text()) * 6000);
        }
    }
}
