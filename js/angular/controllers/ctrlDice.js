dicegame.controller('ctrlDice', ['$scope', '$timeout','$GlobalService',
    function($scope,$timeout,$GlobalService){

        //inject our globalservice
        $scope.$GlobalService = $GlobalService;
        $scope.currentPane = 'splash';
        $scope.currentRollSides = [];
        $scope.currentRollTotal = 0;

        //default values for die setup
        $scope.newDieName  = '';
        $scope.newDieDesc  = '';
        newDieTemplate     = '';

        $scope.editDieID   = 0;
        $scope.editDieName = '';
        $scope.editDieDesc = '';

        $scope.editSideID    = 0;
        $scope.editSideLabel = '';
        $scope.editSideValue = 0;
        $scope.editSideIcon  = '';

        $scope.deleteDieID = 0;

        //Sets the current pane
        $scope.setCurrentPane = function(pane) {
            $scope.currentPane = pane;
        }

        //Pushes the current die setup to gameData.dice
        $scope.createDie = function() {
            var i, curDie, cnt = 0;
            var diceToSet = [];
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;

            //reassign dice ids
            if (curDiceLength > 0) {
                for(i=0; i<curDiceLength; i++) {
                    curDie = curDice[i];
                    curDie.did = cnt; cnt++;
                    diceToSet.push(curDie);
                }
            }

            //Add our new die
            curDie = {
                'did'    : cnt,
                'dname'  : $scope.newDieName,
                'desc'   : $scope.newDieDesc,
                'roll'   : 1,
                'sides'  : []
            }

            //check template
            switch($scope.newDieTemplate) {
                case 'd6' :
                    curDie.sides = [
                        {
                            'sid'   : 0,
                            'label' : 'One',
                            'value' : 1,
                            'icon'  : '_1'
                        },
                        {
                            'sid'   : 1,
                            'label' : 'Two',
                            'value' : 2,
                            'icon'  : '_2'
                        },
                        {
                            'sid'   : 2,
                            'label' : 'Three',
                            'value' : 3,
                            'icon'  : '_3'
                        },
                        {
                            'sid'   : 3,
                            'label' : 'Four',
                            'value' : 4,
                            'icon'  : '_4'
                        },
                        {
                            'sid'   : 4,
                            'label' : 'Five',
                            'value' : 5,
                            'icon'  : '_5'
                        },
                        {
                            'sid'   : 5,
                            'label' : 'Six',
                            'value' : 6,
                            'icon'  : '_6'
                        }
                    ]; break;

                case "d20":
                    curDie.sides = [
                        {
                            'sid'   : 0,
                            'label' : 'One',
                            'value' : 1,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 1,
                            'label' : 'Two',
                            'value' : 2,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 2,
                            'label' : 'Three',
                            'value' : 3,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 3,
                            'label' : 'Four',
                            'value' : 4,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 4,
                            'label' : 'Five',
                            'value' : 5,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 5,
                            'label' : 'Six',
                            'value' : 6,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 6,
                            'label' : 'Seven',
                            'value' : 7,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 7,
                            'label' : 'Eight',
                            'value' : 8,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 8,
                            'label' : 'Nine',
                            'value' : 9,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 9,
                            'label' : 'Ten',
                            'value' : 10,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 10,
                            'label' : 'Eleven',
                            'value' : 11,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 11,
                            'label' : 'Twelve',
                            'value' : 12,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 12,
                            'label' : 'Thirteen',
                            'value' : 13,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 13,
                            'label' : 'Fourteen',
                            'value' : 14,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 14,
                            'label' : 'Fifteen',
                            'value' : 1,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 15,
                            'label' : 'Sixteen',
                            'value' : 16,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 16,
                            'label' : 'Seventeen',
                            'value' : 17,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 17,
                            'label' : 'Eighteen',
                            'value' : 18,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 18,
                            'label' : 'Nineteen',
                            'value' : 19,
                            'icon'  : ''
                        },
                        {
                            'sid'   : 19,
                            'label' : 'Twenty',
                            'value' : 20,
                            'icon'  : ''
                        },
                    ]
                    break;
            }

            diceToSet.push(curDie);

            $scope.$GlobalService.gameData.dice = diceToSet;
            $timeout(goBootstrap,500);
            $('.modal_add_die').modal('hide');
        }

        $scope.editDie = function(did) {
            var i, curDie;
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;

            //look for the die we are trying to edit
            for (i=0; i<curDiceLength; i++) {
                curDie = curDice[i];
                if (curDie.did == did) {

                    //we found it! setup and launch the edit die modal
                    $scope.editDieID    = curDie.did;
                    $scope.editDieName  = curDie.dname;
                    $scope.editDieDesc  = curDie.desc;
                    $('.modal_edit_die').modal('show');

                }
            }

        }

        $scope.saveEditDie = function() {
            console.log('saving die');
            console.log($scope.editDieSides);
            var i, curDie;
            var diceToSet = [];
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;

            //recreate dice data
            if (curDiceLength > 0) {
                for(i=0; i<curDiceLength; i++) {
                    curDie = curDice[i];

                    if (curDie.did == $scope.editDieID) {
                        curDie.dname = $scope.editDieName;
                        curDie.desc = $scope.editDieDesc;
                    }

                    diceToSet.push(curDie);
                }
            }

            $scope.$GlobalService.gameData.dice = diceToSet;
            $timeout(goBootstrap,500);
            $('.modal_edit_die').modal('hide');
        }

        $scope.copyDie = function(did) {
            var i, curDie, cnt = 0;
            var diceToSet = [];
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;

            //reassign dice ids
            if (curDiceLength > 0) {
                for(i=0; i<curDiceLength; i++) {
                    curDie = curDice[i];
                    curDie.did = cnt; cnt++;
                    diceToSet.push(curDie);

                    //check if we are copying this one
                    if (curDie.did == did) {
                        var newDie = angular.copy(curDie);
                        newDie.did = cnt; cnt++;
                        newDie.dname += ' (copy)';
                        diceToSet.push(newDie);
                    }
                }
            }

            $scope.$GlobalService.gameData.dice = diceToSet;
            $timeout(goBootstrap,500);
        }

        $scope.confirmDelete = function(did) {
            $scope.deleteDieID = did;
            $('.modal_delete_die').modal('show');
        }

        $scope.deleteDie = function() {
            var i, curDie;
            var diceToSet = [];
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;

            //recreate dice data
            if (curDiceLength > 0) {
                for(i=0; i<curDiceLength; i++) {
                    curDie = curDice[i];

                    if (curDie.did != $scope.deleteDieID) {
                        diceToSet.push(curDie);
                    }

                }
            }

            $scope.$GlobalService.gameData.dice = diceToSet;
            $timeout(goBootstrap,500);
            $('.modal_delete_die').modal('hide');
        }

        $scope.getDieSides = function() {
            var i, curDie;
            var diceToSet = [];
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;
            if (curDiceLength > 0) {
                for(i=0; i<curDiceLength; i++) {
                    curDie = curDice[i];
                    if (curDie.did == $scope.editDieID) {
                        return curDie.sides;
                    }
                }
            }
        }

        $scope.cancelDieSide = function() {
            $('.modal_edit_die_side').modal('hide');
            $('.modal_edit_die').modal('show');
        }

        $scope.addDieSide = function() {
            $scope.editSideID = -1;
            $scope.editSideLabel = '';
            $scope.editSideValue = 0;
            $scope.editSideIcon = '';
            $('.modal_edit_die').modal('hide');
            $('.modal_edit_die_side').modal('show');
        }

        $scope.editDieSide = function(sid) {
            console.log('edit:'+sid);
            var i, curDie;
            var diceToSet = [];
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;

            //look for the die we are editing
            if (curDiceLength > 0) {
                for(i=0; i<curDiceLength; i++) {
                    curDie = curDice[i];
                    if (curDie.did == $scope.editDieID) {
                        //loop through and reassign IDs, updating the one we edit
                        var j, curSide;
                        var curSides = curDie.sides;
                        var curSidesLength = curSides.length;
                        if (curSidesLength > 0) {
                            for (j=0; j<curSidesLength; j++) {
                                curSide = curSides[j];
                                if (curSide.sid == sid) {
                                    $scope.editSideID = curSide.sid;
                                    $scope.editSideLabel = curSide.label;
                                    $scope.editSideValue = curSide.value;
                                    $scope.editSideIcon = curSide.icon;
                                    $('.modal_edit_die').modal('hide');
                                    $('.modal_edit_die_side').modal('show');
                                    break;
                                }
                            }
                        }
                    }
                }
            }

        }

        $scope.chooseSideIcon = function() {
            $('.modal_edit_die_side').modal('hide');
            $('.modal_icons').modal('show');
        }

        $scope.cancelChooseIcon = function() {
            $('.modal_icons').modal('hide');
            $('.modal_edit_die_side').modal('show');
        }

        $scope.setEditIcon = function(iconName) {
            $scope.editSideIcon = iconName;
            $('.modal_icons').modal('hide');
            $('.modal_edit_die_side').modal('show');
        }

        $scope.saveDieSide = function() {
            var i, curDie;
            var diceToSet = [];
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;

            var newSide = {
                'sid'   : $scope.editSideID,
                'label' : $scope.editSideLabel,
                'value' : $scope.editSideValue,
                'icon'  : $scope.editSideIcon
            }

            //look for the die we are editing
            if (curDiceLength > 0) {
                for(i=0; i<curDiceLength; i++) {
                    curDie = curDice[i];
                    if (curDie.did == $scope.editDieID) {

                        //we found the die we are editing!

                        //loop through and reassign IDs, updating the one we edit
                        var j, curSide, cnt = 0;
                        var sidesToSet = [];
                        var curSides = curDie.sides;
                        var curSidesLength = curSides.length;
                        if (curSidesLength > 0) {
                            for (j=0; j<curSidesLength; j++) {
                                curSide = curSides[j]; //grab side

                                if (curSide.sid == $scope.editSideID) {
                                    curSide = newSide;
                                    curSide.sid = cnt;
                                } else {
                                    curSide.sid = cnt;
                                }

                                sidesToSet.push(curSide);
                                cnt++;
                            }
                        }

                        //if it's a new side we are adding, push it
                        if (newSide.sid == -1) {
                            newSide.sid = cnt;
                            sidesToSet.push(newSide);
                        }

                        curDie.sides = sidesToSet;
                        break;
                    }
                }
            }

            $('.modal_edit_die_side').modal('hide');
            $('.modal_edit_die').modal('show');
        }

        $scope.hasRolled = function(did) {
            var curSides = $scope.currentRollSides;
            var curSidesLength = curSides.length;
            var i, curSide;
            if (curSidesLength > 0) {
                for (i=0; i<curSidesLength; i++) {
                    curSide = curSides[i];
                    if (curSide.did == did) { return true; }
                }
            }
            return false;
        }

        $scope.rollEm = function() {
            $scope.currentPane = 'roll';

            //Recreate our currentRollSides
            $scope.currentRollSides = [];
            $scope.currentRollTotal = 0;
            var curDice = $scope.$GlobalService.gameData.dice;
            var curDiceLength = curDice.length;
            var i, j, curDie, sideToAdd, curSide, curSides, curSidesLength;

            if (curDiceLength > 0) {
                for (i=0; i<curDiceLength; i++) {
                    curDie = curDice[i];
                    curSides = curDie.sides;
                    curSidesLength = curSides.length;
                    if (curDie.roll > 0 && curSidesLength > 0) {
                        for (j=0;j<curDie.roll;j++) {
                            sideToAdd = angular.copy(curSides[getRandomInt(0,curSidesLength-1)]);
                            sideToAdd.did = curDie.did;
                            $scope.currentRollTotal += sideToAdd.value;
                            $scope.currentRollSides.push(sideToAdd);
                        }
                    }
                }
            }
        }

    }
]);
