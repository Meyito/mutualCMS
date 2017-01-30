(function (module) {
    "use strict";

    module.controller("ListChallengesController", ListChallengesController);

    ListChallengesController.$inject = [
        "blockUI",
        'NgTableParams',
        'challengesService',
        'challengesList'
    ];

    function ListChallengesController(blockUI, NgTableParams, challengesService, challengesList) {

        var blockedItem = blockUI.instances.get('blockUI');
        var challenges = this;

        challenges.tableParams = new NgTableParams({}, {
            dataset: challengesList
        });
    }
})(angular.module('app.challenges'));