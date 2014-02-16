dicegame.factory('$GlobalService', ['$location', '$rootScope', '$timeout', function($location,$rootScope,$timeout) {
    var $scope = this;

    //inject our location
    $scope.$location = $location;

    //default value for game state filename to load
    $scope.loadFileName = 'savestate/game.txt';

    //creates a blank game
    $scope.gameNameToSet;
    $scope.gameData;
    $scope.resetGame = function() {
        $scope.gameNameToSet = '';
        if (typeof gameData != 'undefined') {
            $scope.gameData = gameData;
        } else {
            $scope.gameData = {
                'gameName' : '',
                'dice'     : []
            };
        }
    }
    $scope.resetGame();

    //creates a new game
    $scope.newGame = function() {
        $scope.resetGame();
        $('.modal_gameName').modal('show');
    }

    //Sets the game's name when user enters in modal
    $scope.setGameName = function() {
        $scope.gameData.gameName = $scope.gameNameToSet;
        $('.modal_gameName').modal('hide');
    }

    //saves the game state by sending to browser
    //uses FileSaver.js
    $scope.saveGameState = function() {
        var stringToSave = 'var gameData = ' + JSON.stringify($scope.gameData) + ';';
        var blobToSave = new Blob([stringToSave], {type: "text/plain;charset=utf-8"});
        saveAs(blobToSave, "gameData.js");
    }

    return $scope;
}]);