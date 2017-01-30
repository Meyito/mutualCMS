(function (module) {
    "use strict";

    module.service('challengesService', challengesService);

    challengesService.$inject = [
        'Restangular',
        'Upload',
        'APP_DEFAULTS',
        '$q'
    ];

    function challengesService(Restangular, Upload, APP_DEFAULTS, $q) {
        /*jshint validthis: true */
        var challenges = this;
        challenges.resource = "challenges";

        challenges.create = function (newChallenge) {
            return Restangular.all(challenges.resource).post(newChallenge);
        };

        /**
         * Gets the list of registered challenges
         * @returns promise
         */
        challenges.all = function (params) {
            return Restangular.one(challenges.resource).get(params);
        };

        challenges.find = function (id, params) {
            return Restangular.one(challenges.resource, id).get(params);
        };

        challenges.update = function (challenge) {
            return Restangular.one(challenges.resource, challenge.id).customPUT(challenge);
        };

        challenges.delete = function (id) {
            return Restangular.one(challenges.resource, id).customDELETE();
        };

        challenges.uploadFile = function (file, container) {

            var url = APP_DEFAULTS.ENDPOINT + "/files/" + container;

            return Upload.upload({
                'url': url + "/upload",
                data: {file: file}
            });
        };

        challenges.removeFile = function (filename, container) {
            return Restangular.one('files', container).all('files').customDELETE(filename);
        };

        challenges.createQuestion = function (challengeID, question) {
            return Restangular.one(challenges.resource, challengeID).customPOST(question, 'reviewQuestions');
        };

        challenges.deleteQuestion = function (challengeID, questionID) {
            return Restangular.one(challenges.resource, challengeID).all('reviewQuestions').customDELETE(questionID);
        };

        challenges.updateQuestion = function (challengeID, question) {
            return Restangular.one(challenges.resource, challengeID).one('reviewQuestions', question.id).customPUT(question);
        };

        challenges.deleteAnswer = function (challengeID, questionID, answerID) {
            return Restangular.one(challenges.resource, challengeID).one('reviewQuestions', questionID).all('answers').customDELETE(answerID);
        };

        challenges.createAnswer = function (challengeID, questionID, answer) {
            return Restangular.one(challenges.resource, challengeID).one('reviewQuestions', questionID).customPOST(answer, 'answers');
        };

        challenges.updateAnswer = function (challengeID, questionID, answer) {
            return Restangular.one(challenges.resource, challengeID).one('reviewQuestions', questionID).one('answers', answer.id).customPUT(answer);
        };

        return challenges;
    }

})(angular.module("app.challenges"));