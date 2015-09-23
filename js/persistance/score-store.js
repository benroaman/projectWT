game.ScoreStore = function(storeName) {
    var scores = [];
    var name = storeName || '';
    var latest;

    return {

        getScores: function() {
            return scores;
        },

        getStoreName: function() {
            return storeName;
        },

        getLatest: function() {
            return latest;
        },

        isHighScore: function(points) {
            if (!scores[9] || points > scores[9].points) {
                return true;
            }
            return false;
        },

        addScore: function(newScore) {
            for (var i = 0; i < 10; i++) {
                if (!scores[i]) {
                    scores[i] = newScore;
                    latest = i;
                    this.save();
                    break;
                }
                if (newScore.points === scores[i].points) {
                    continue;
                }
                if (newScore.points > scores[i].points) {
                    scores.splice(i, 0, newScore);
                    scores = scores.slice(0, 10);
                    latest = i;
                    this.save();
                    break;
                }
            }
        },

        save: function() {
            localStorage.setItem(name, JSON.stringify(scores));
            localStorage.setItem(name + 'latest', JSON.stringify(latest));
        },

        load: function() {
            scores = JSON.parse(localStorage.getItem(name) || '[]');
            latest = JSON.parse(localStorage.getItem(name + 'latest') || '[]');
        }
    };
}
