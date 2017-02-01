(function (module) {
    "use strict";

    module.controller("AddChallengeController", AddChallengeController);

    AddChallengeController.$inject = [
        'challengesService',
        'blockUI',
        '$state',
        'categories',
        'characteristics',
        '$q',
        'selectedChallenge',
        'APP_DEFAULTS',
        'images',
        '$uibModal',
        '$scope'
    ];

    function AddChallengeController(challengesService, blockUI, $state, categories, characteristics, $q, selectedChallenge,
                                    APP_DEFAULTS, images, $uibModal, $scope) {

        var addChallenge = this;
        var blockedItem = blockUI.instances.get('blockUI');
        var filesSection = blockUI.instances.get('files');
        var questionsSection = blockUI.instances.get('questions');

        if (selectedChallenge) {
            parseData(selectedChallenge);
        } else {
            addChallenge.params = {};
            addChallenge.questions = [];
        }

        addChallenge.categories = categories;
        addChallenge.characteristics = characteristics;
        addChallenge.currentTab = 'general';

        addChallenge.redirect = function () {
            $state.go("home.challenges", {}, {reload: true});
        };

        /**
         * Stores a new challenge by using the information contained in addChallenge.params Object
         */
        addChallenge.save = function (form) {

            blockedItem.start();

            if (addChallenge.params.id) {
                return addChallenge.update(form);
            }

            challengesService
                .create(addChallenge.params)
                .then(function (response) {
                    swal("Éxito!", "Se ha guardado la Información General del Reto, ahora debe registrarle preguntas", "success");
                    addChallenge.currentTab = 'questions';
                    addChallenge.params.id = response.id;
                    addChallenge.questions.push({answers: [{}]});
                    form.$setPristine();
                })
                .catch(function (error) {
                    if (error.status === 400) {
                        addChallenge.errors = error.data.errors;
                        addChallenge.showErrors = true;
                    }
                })
                .finally(function () {
                    blockedItem.stop();
                });
        };

        addChallenge.update = function (form) {

            challengesService
                .update(addChallenge.params)
                .then(function (response) {
                    swal("Éxito!", "Se ha actualizado la Información General del Reto", "success");
                    addChallenge.currentTab = 'questions';
                    form.$setPristine();
                })
                .catch(function (error) {
                    if (error.status === 400) {
                        addChallenge.errors = error.data.errors;
                        addChallenge.showErrors = true;
                    }
                })
                .finally(function () {
                    blockedItem.stop();
                });
        };

        addChallenge.validateFile = function ($file) {

            if (!$file) {
                return;
            }

        };

        addChallenge.uploadImage = function () {
            upload(addChallenge.image, 'images', 'image');
        };

        addChallenge.uploadIcon = function () {
            upload(addChallenge.icon, 'icons', 'icon');
        };

        addChallenge.removeImage = function () {
            addChallenge.params.image = addChallenge.image = undefined;
            // remove('images', 'image');
        };

        addChallenge.removeIcon = function () {
            remove('icons', 'icon');
        };

        addChallenge.removeAttachment = function () {
            remove('attach', 'attached');
        };

        addChallenge.uploadAttachment = function () {
            upload(addChallenge.attached, 'attach', 'attached');
        };

        addChallenge.selectImage = function () {

            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/modules/challenges/challenges.add.selectImage.tmpl.html',
                controller: 'SelectImageController',
                controllerAs: 'images',
                size: "lg",
                resolve: {
                    imageList: function () {
                        return images;
                    }
                }
            }).result.then(function (data) {
                addChallenge.params.image = data.savePath;
                addChallenge.image = APP_DEFAULTS.ENDPOINT + addChallenge.params.image;
            });
        };

        addChallenge.saveQuestion = function (form, question) {

            questionsSection.start();


            if (question.id) {
                return addChallenge.updateQuestion(form, question);
            }

            var data = getQuestionData(question);

            challengesService
                .createQuestion(addChallenge.params.id, data)
                .then(function (response) {
                    question.id = response.id;
                    saveAnswers(question, form);
                })
                .finally(function () {
                    questionsSection.stop();
                });
        };

        function getQuestionData(question) {
            return {
                content: question.content,
                challengeId: addChallenge.params.id,
                characteristicId: question.characteristicId,
                id: question.id
            };
        }

        function saveAnswers(question, form) {

            var answerPromises = [];
            question.answers.forEach(function (answer) {

                if (answer.content) {
                    answerPromises.push(saveAnswer(question, answer));
                }

                $q.all(answerPromises).then(function () {
                    form.$setPristine();
                    swal("Éxito!", "Se ha guardado la pregunta", "success");
                });

            });
        }

        addChallenge.updateQuestion = function (form, question) {

            var data = getQuestionData(question);

            challengesService
                .updateQuestion(addChallenge.params.id, data)
                .then(function () {
                    saveAnswers(question, form);
                })
                .finally(function () {
                    questionsSection.stop();
                });
        };

        addChallenge.deleteQuestion = function (question) {

            if (!question.id) {
                return addChallenge.removeQuestion(question);
            }

            questionsSection.start();

            challengesService
                .deleteQuestion(addChallenge.params.id, question.id)
                .then(function (response) {
                    swal("Éxito!", "Se ha eliminado la pregunta", "success");
                    var index = addChallenge.questions.indexOf(question);
                    addChallenge.questions.splice(index, 1);
                })
                .finally(function () {
                    questionsSection.stop();
                });
        };

        addChallenge.removeQuestion = function (question) {
            var index = addChallenge.questions.indexOf(question);
            addChallenge.questions.splice(index, 1);
        };

        addChallenge.addQuestion = function () {
            addChallenge.questions.push({answers: [{}]});
        };

        addChallenge.addAnswer = function (question) {
            question.answers.push({});
        };

        addChallenge.deleteAnswer = function (question, answer) {

            if (!answer.id) {
                return addChallenge.removeAnswer(question, answer);
            }

            questionsSection.start();

            challengesService
                .deleteAnswer(addChallenge.params.id, question.id, answer.id)
                .then(function () {
                    addChallenge.removeAnswer(question, answer);
                })
                .finally(function () {
                    questionsSection.stop();
                });
        };

        addChallenge.removeAnswer = function (question, answer) {
            var index = question.answers.indexOf(answer);
            question.answers.splice(index, 1);
        };

        addChallenge.returnToList = function () {
            $state.go("home.challenges", {}, {reload: true});
        };

        function saveAnswer(question, answer) {

            if (answer.id) {
                return updateAnswer(question, answer);
            }

            return challengesService
                .createAnswer(addChallenge.params.id, question.id, answer)
                .then(function (response) {
                    answer.id = response.id;
                });
        }

        function updateAnswer(question, answer) {
            return challengesService.updateAnswer(addChallenge.params.id, question.id, answer);
        }

        function upload(file, container, pos) {
            filesSection.start();
            challengesService.uploadFile(file, container).then(function (response) {
                addChallenge.params[pos] = "/files/" + container + "/download/" + response.data.result.files.file[0].name;
            }).finally(function () {
                filesSection.stop();
            });
        }

        function remove(container, pos) {
            filesSection.start();

            var imageName = addChallenge.params[pos].split("/").pop();

            challengesService.removeFile(imageName, container).then(function () {
                addChallenge.params[pos] = undefined;
                addChallenge[pos] = undefined;
            }).finally(function () {
                filesSection.stop();
            });
        }

        function parseData(selectedChallenge) {
            addChallenge.questions = angular.copy(selectedChallenge.reviewQuestions);
            selectedChallenge.reviewQuestions = undefined;
            addChallenge.params = selectedChallenge;

            addChallenge.icon = APP_DEFAULTS.ENDPOINT + addChallenge.params.icon;
            addChallenge.image = APP_DEFAULTS.ENDPOINT + addChallenge.params.image;
            if (addChallenge.params.attached) {
                addChallenge.attached = APP_DEFAULTS.ENDPOINT + addChallenge.params.attached;
            }
        }
    }

})(angular.module("app.challenges"));